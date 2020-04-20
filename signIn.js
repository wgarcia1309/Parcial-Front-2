$("#login").click(function() {
     username = $("#username").val();
     password = $("#password").val();
     firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        getError(errorCode);
    });
    
});

function getError(code){
    return   Swal.fire({
                        icon: 'error',
                        title: errors[code],
                    });
}

const errors={
        'auth/user-not-found' :'Usuario y/o contraseña incorrectos',
        'auth/wrong-password' :'Usuario y/o contraseña incorrectos',
        'auth/invalid-email': 'Correo invalido',
        'auth/user-disabled': 'Usuario desahabilitado'
    }