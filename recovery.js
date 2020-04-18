$("#recuperar").click(function() {
    event.preventDefault();
    email = $("#Email").val();
    firebase.auth().fetchSignInMethodsForEmail(email).then(function(signInMethods) {
        
        if (signInMethods.length<=0){
            Swal.fire({
                icon: 'error',
                title: 'Correo no encontrado',
            });
        }else{
            Swal.fire({
                icon: 'success',
                title: 'Listo, revisa tu bandeja de entrada',
            });
        }
    });
});
