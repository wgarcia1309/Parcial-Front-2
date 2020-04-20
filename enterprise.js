var empresa = firebase.database().ref('Empresas/' + localStorage.uid);
function myProfile(){
  empresa.once('value')
  .then(function (snapshot) {
    console.log(snapshot.val())
  });
}

$('#registrarCuestionario').click(createQuestions()).then(
    Swal.fire({
      icon: 'success',
      title: 'Su cuestionario ha sido creado',
    })
  );


function removeEmployeeAnswer(employeeuid){
  firebase.database().ref('/Empleados/'+employeeuid+'/Cuestionario').remove().then(()=>{
    Swal.fire({
      icon:  'success',
      title: 'Respuesta eliminada',
  })
});
}

function removeQuestions(Empresauid){
  firebase.database().ref('/Empresas/'+Empresauid+'/cuestionario').remove().then(()=>{
    Swal.fire({
      icon:  'success',
      title: 'Cuestionario eliminado',
  })
});
}

function createQuestions() {
  cuestionario = firebase.database().ref('Empresas/' + localStorage.uid + '/cuestionario')
  cuestionario.set({
    'Pregunta 1': {
      'enunciado': $('#pregunta1').val(),
      'valor': $('#valor1').val(),
      'opciones': [$('#correcta1').val(), $('#incorrecta11').val(), $('#incorrecta12').val(), $('#incorrecta13').val()],
      'respuesta': $('#correcta1').val()
    },
    'Pregunta 2': {
      'enunciado': $('#pregunta2').val(),
      'valor': $('#valor2').val(),
      'opciones': [$('#correcta2').val(), $('#incorrecta21').val(), $('#incorrecta22').val(), $('#incorrecta23').val()],
      'respuesta': $('#correcta2').val()
    },
    'Pregunta 3': {
      'enunciado': $('#pregunta3').val(),
      'valor': $('#valor3').val(),
      'opciones': [$('#correcta3').val(), $('#incorrecta31').val(), $('#incorrecta32').val(), $('#incorrecta33').val()],
      'respuesta': $('#correcta3').val()
    },
    'Pregunta 4': {
      'enunciado': $('#pregunta4').val(),
      'valor': $('#valor4').val(),
      'opciones': [$('#correcta4').val(), $('#incorrecta41').val(), $('#incorrecta42').val(), $('#incorrecta43').val()],
      'respuesta': $('#correcta4').val()
    },
    'Pregunta 5': {
      'enunciado': $('#pregunta5').val(),
      'valor': $('#valor5').val(),
      'opciones': [$('#correcta5').val(), $('#incorrecta51').val(), $('#incorrecta52').val(), $('#incorrecta53').val()],
      'respuesta': $('#correcta5').val()
    }
  });
}

function createEmployee(correo,password){
  secondaryApp.auth().createUserWithEmailAndPassword(correo, password);
}



function DBERegistrer(employeeuid){
  Empleados = firebase.database().ref('Empleados/'+employeeuid);
  Empleados.set({
          'Empresa':localStorage.uid,
          'estado': true,
          'direccion' :'dddddddddd',
          'foto':'dddddddddd'
  }).then(()=>{
    firebase.database().ref('Empresas/'+localStorage.uid+'/Empleados/'+employeeuid).set({
      'trash':''
    }).then(()=>{
          Swal.fire({
              icon:  'success',
              title: 'El empleado ha sido registrado',
          })
        })
  })
}


function removeEmployee(employeeuid){
  firebase.database().ref('/Empleados/'+employeeuid).remove().then(()=>{
    db=firebase.database().ref('/Empresas/'+localStorage.uid+'/Empleados/'+employeeuid).remove().then(
    ()=>{
        Swal.fire({
          icon:  'success',
          title: 'Empleado eliminado',
        })
    }); 
  })
}


function seeEmployeeProfile(employeeuid){
  firebase.database().ref('/Empleados/'+employeeuid).once('value')
  .then(function (snapshot) {
    console.log(snapshot.val())
  });
}

function updateEmployee(employeeuid){
  firebase.database().ref('/Empleados/'+employeeuid).update({
    'direccion':'avenidas siempre viva'
  }).then(
    Swal.fire({
      icon:  'success',
      title: 'Datos del empleado actualizados',
  })
  );
}


function enableEmployee(){
}

function disableEmployee(){


}