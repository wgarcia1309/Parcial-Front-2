$("#login").click(function() {
    event.preventDefault();
    username = $("#username").val();
    password = $("#password").val();
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                localStorage.auth = idToken;
                localStorage.uid = firebase.auth().currentUser.uid;

                uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users/" + uid).update({
                    "name": $("#nameUser").val(),
                    "status": "0",
                    "uid": uid,
                    "challenge": false,
                    "statusChallenge": false
                });
            });
            window.location = "triqui.html";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Usuario y/o contraseña son incorrectos',
            });
        }
    });
});
$("#registrarme").click(function() {
    event.preventDefault();
    username = $("#emailUser").val();
    password = $("#passUser").val();
    firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
    // autenticacion con firebase
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            uid = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + uid).set({
                "name": $("#nameUser").val(),
                "status": "0",
                "uid": uid,
                "challenge": false,
                "statusChallenge": false
            });
        }
    });
    Swal.fire({
        icon: 'success',
        title: 'usuario registrado, ya puede ingresar',
    });
});