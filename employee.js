function enableEmployee(){
    empleados = firebase.database().ref('Empleados/')
    if(empleados.child('Empresa').val()===localStorage.uid){
        empleados.update({
            'estado':false
        })

        
    }else{
        /*no es la empresa mensaje error */
        console.log("no es el empleador")
    }
}

function disableEmployee(){


}