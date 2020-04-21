$("#registrarme").click(function() {
 event.preventDefault();
    if ($(".passwd")[0].value===$(".passwd")[1].value && $(".passwd")[0].value.length>5){
        let email = $("#Email").val();
        firebase.auth().fetchSignInMethodsForEmail(email).then(function(signInMethods) {
            if (signInMethods.length<=0){
                let password=$(".passwd")[0].value;    
                firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                      alert('The password is too weak.');
                    } else {
                      alert(errorMessage);
                    }
                    console.log("ERROR"+error);
                });
            }else{
                Swal.fire({
                    icon:  'error',
                    title: 'Este correo ya esta siendo usado por otra empresa',
                });
            }
        });
    }else{
        if (!($(".passwd")[0].value===$(".passwd")[1].value)){
            Swal.fire({
                icon:  'error',
                title: 'Las contraseñas no coinciden',
            });
        }else{
            Swal.fire({
                icon:  'error',
                title: 'La contraseña debe tener 6 caracteres o mas',
            });
        }
    }
});

function DBRegistrer(email){
    empresa = firebase.database().ref('Empresas/'+localStorage.uid)
    empresa.set({
            "Correo":email,
            "Nombre": $("#empresa").val(),
            "representante" :$("#replegal").val(),
            "tipo_documento" : $("#tipo").val() ,
            "numero_doc": $("#Iddoc").val(),
            "Imagen":"NA",
            "Teléfono":$("#telefono").val(),
            "Empleados":{}
    }).then(
            Swal.fire({
                icon:  'success',
                title: 'Su empresa ha sido registrada',
            }).then(function() {
                window.location = "administracion.html";
            })
    )
}
