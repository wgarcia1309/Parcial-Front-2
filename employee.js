function sendAnswers(EmployeeUID){
    firebase.database().ref('/Empleados/'+EmployeeUID+'/Cuestionario').set({
        'Pregunta 1':{
                      'respuesta':'a'
                    },
        'Pregunta 2':{
                      'respuesta':'b'
                    },
        'Pregunta 3':{
                      'respuesta':'c'
                    },
        'Pregunta 4':{
                      'respuesta':'d'
                    },
        'Pregunta 5':{
                      'respuesta':'a'
                    }
      }).then(()=>{
        then(()=>{
            Swal.fire({
              icon:  'success',
              title: 'Respuestas enviadas',
          })
        })
      }
      )
}

function getPoints(empleadouid){

    firebase.database().ref('/Empleados/'+empleadouid).once('value').then(function(snapshot) {
        console.log(snapshot.child('/Cuestionario').val());
        respuestasuser=snapshot.child('/Cuestionario').val();
        firebase.database().ref('/Empresas/'+snapshot.child('/Empresa').val()).once('value').then(function(snapshot2) {
            console.log(
                snapshot2.val()
            );
            respuestasEmpresas=snapshot2.child('/Cuestionario').val();
        }).then(()=>{
            
            {   
                MaxScore=0;
                score=0;
                for(let i=1;i<=5;i++){
                    if(respuestasuser['Pregunta '+i]['respuesta']===respuestasEmpresas['Pregunta '+i]['respuesta']){
                        score+=respuestasEmpresas['Pregunta '+i]['valor'];
                    }
                    MaxScore+=respuestasEmpresas['Pregunta '+i]['valor'];
                }
                console.log(score);
                console.log(score/MaxScore*100+'%');
            }
            
        });
      });

    
}


function enableEmployee(){
    empleados = firebase.database().ref('Empleados/')
    if(empleados.child('Empresa').val()===localStorage.uid){
        empleados.update({
            'estado':false
        })

        
    }else{
        /*no es la empresa mensaje error */
        console.log('no es el empleador')
    }
}

function disableEmployee(){


}