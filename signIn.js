$("#login").click(function() {
     username = $("#username").val();
     password = $("#password").val();
     firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;7
        console.log(errorCode);
        console.log(errorMessage);
    });

    event.preventDefault();
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                localStorage.auth = idToken;
                localStorage.uid = firebase.auth().currentUser.uid;
                uid = firebase.auth().currentUser.uid;
            });
            window.location = "operador.html";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario y/o contraseña son incorrectos',
            });
        }
    });
});