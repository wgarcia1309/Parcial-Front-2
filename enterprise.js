var empresa = firebase.database().ref('Empresas/' + localStorage.uid);
function myProfile() {
  empresa.once('value')
    .then(function (snapshot) {
      console.log(snapshot.val())
    });
}

$('#registrarCuestionario').click(function () {
  event.preventDefault();
  createQuestions();
});

$('#crearEmpleado').click(function () {
  event.preventDefault();
  createEmployee($('#correo').val(), $('#password').val());
});

$('#removequestions').click(function(){
  event.preventDefault();
  removeQuestions(localStorage.uid);
})

$('#actualizarEmpleado').click(function () {
  event.preventDefault();
  updateEmployee(sessionStorage.getItem("empleadotoupdate"));
});

function removeEmployeeAnswer(employeeuid) {
  firebase.database().ref('/Empleados/' + employeeuid + '/cuestionario').update({
    'Pregunta 1': '',
    'Pregunta 2': '',
    'Pregunta 3': '',
    'Pregunta 4': '',
    'Pregunta 5': ''
  }).then(() => {
    if(localStorage.status==="INDIVIDUAL"){
      Swal.fire({
        icon: 'success',
        title: 'Respuesta eliminada',
      })
    }
    localStorage.status=""
  });
}

function removeQuestions(Empresauid) {
  firebase.database().ref('/Empresas/' + Empresauid + '/cuestionario').remove().then(() => {
    firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados').once('value', function (snapshot) {
      var empleados = Object.getOwnPropertyNames(snapshot.val());
      empleados.forEach((empleado, idx) => {
        removeEmployeeAnswer(empleado);
      })
    }).then(()=>
      Swal.fire({
        icon: 'success',
        title: 'Cuestionario eliminado',
      })
    )
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
  }).then(
    Swal.fire({
      icon: 'success',
      title: 'Su cuestionario ha sido creado',
    })
  );
}

function createEmployee(correo, password) {
  localStorage.pwd = password;
  localStorage.state = "CREATE";
  secondaryApp.auth().createUserWithEmailAndPassword(correo, password);
}

function DBERegistrer(employeeuid) {
  Empleados = firebase.database().ref('Empleados/' + employeeuid);
  Empleados.set({
    'nombre': $('#nombreOperador').val(),
    'Empresa': localStorage.uid,
    'estado': true,
    'direccion': $('#direccion').val(),
    'foto': 'dddddddddd',
    'cuestionario':
    {
      'Pregunta 1': '',
      'Pregunta 2': '',
      'Pregunta 3': '',
      'Pregunta 4': '',
      'Pregunta 5': '',
      'puntaje': -1,
      'maxscore': -1,
      'porcentaje': -1
    }
  }).then(() => {
    firebase.database().ref('Empresas/' + localStorage.uid + '/Empleados/' + employeeuid).set({
      'correo': $('#correo').val(),
      'password': localStorage.pwd
    }).then(() => {
      localStorage.pwd = "";
      Swal.fire({
        icon: 'success',
        title: 'El empleado ha sido registrado',
      })
    })
  })
}

function removeEmployee(employeeuid) {
  localStorage.state = "DELETE"
  firebase.database().ref('/Empleados/' + employeeuid).remove().then(() => { 
    firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados/' + employeeuid).once('value').then(function (snapshot) {
      let email = snapshot.child('correo').val()
      let pwd = snapshot.child('password').val()
      firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados/' + employeeuid).remove().then(() => {
        firebase.database().ref('/Empresas/' + localStorage.uid + '/Historial/' + employeeuid).remove().then(() => {
          secondaryApp.auth().signInWithEmailAndPassword(email, pwd).then(() => {
            localStorage.state = "DELETE"
            secondaryApp.auth().currentUser.delete().then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Empleado eliminado',
              }).then(()=>{
                removebox(employeeuid);
              })
            });
          });

        });

      });
    })
  });
}

function seeEmployeeProfile(employeeuid) {
  firebase.database().ref('/Empleados/' + employeeuid).once('value')
    .then(function (snapshot) {
      console.log(snapshot.val())
    });
}

function updateEmployee(employeeuid) {
  changepassword = $('#password').val() === "" ? false : true;
  firebase.database().ref('/Empleados/' + employeeuid).update({
    'direccion': $('#direccion').val(),
    'nombre': $('#nombreOperador').val(),
  }).then(() => {
    console.log(changepassword);
    if (changepassword) {
      localStorage.state = "UPDATE";
      firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados/' + employeeuid).once('value').then(function (snapshot) {
        let email = snapshot.child('correo').val();
        let pwd = snapshot.child('password').val();
        secondaryApp.auth().signInWithEmailAndPassword(email, pwd).then(() => {
          newpwd = $('#password').val()
          secondaryApp.auth().currentUser.updatePassword(newpwd).then(function () {
            firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados/' + employeeuid).update({
              'password': newpwd
            }).then(Swal.fire({
              icon: 'success',
              title: 'Datos del empleado actualizados',
            })).then(window.location = "administracion.html");
          }).catch(function (error) {
            //update passerrors
            // An error happened.
          });
        }).catch(function (error) {
          //login errors
        });
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Datos del empleado actualizados',
      }).then(window.location = "administracion.html");
    }
  })
}

function enableEmployee(employeeuid, target) {
  firebase.database().ref('/Empleados/' + employeeuid).update({
    'estado': true
  }).catch((e) => {
    swal.fire({
      icon: 'error',
      title: 'ups ha ocurrido un error'
    });
    target.removeClass('disabled');
  }).then(() => {
    swal.fire({
      icon: 'success',
      title: 'Operador habilitado'
    });
    target.text('Deshabilitar');
    target.removeClass('disabled');
  })
}

function disableEmployee(employeeuid, target) {
  firebase.database().ref('/Empleados/' + employeeuid).update({
    'estado': false
  }).catch((e) => {
    swal.fire({
      icon: 'error',
      title: 'ups ha ocurrido un error'
    });
    target.removeClass('disabled');
  }).then(() => {
    swal.fire({
      icon: 'success',
      title: 'Operador inhabilitado'
    });
    target.text('Habilitar');
    target.removeClass('disabled');
  })
}

