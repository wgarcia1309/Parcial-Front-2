subscribe()

$('#enviarCuestionario').click(function () {
  event.preventDefault();
  sendAnswers(localStorage.uid);
  getPoints(localStorage.uid);
});

function sendAnswers(EmployeeUID) {
  firebase.database().ref('/Empleados/' + EmployeeUID + '/cuestionario').update({
    'Pregunta 1': {
      'respuesta': $("input[name='q-1']:checked").val()
    },
    'Pregunta 2': {
      'respuesta': $("input[name='q-2']:checked").val()
    },
    'Pregunta 3': {
      'respuesta': $("input[name='q-3']:checked").val()
    },
    'Pregunta 4': {
      'respuesta': $("input[name='q-4']:checked").val()
    },
    'Pregunta 5': {
      'respuesta': $("input[name='q-5']:checked").val()
    }
  });
}

function getPoints(empleadouid) {

  firebase.database().ref('/Empleados/' + empleadouid).once('value').then(function (snapshot) {
    respuestasuser = snapshot.child('/cuestionario').val();
    firebase.database().ref('/Empresas/' + snapshot.child('/Empresa').val()).once('value').then(function (snapshot2) {
      respuestasEmpresas = snapshot2.child('/cuestionario').val();
    }).then(() => {
      MaxScore = 0;
      score = 0;
      for (let i = 1; i <= 5; i++) {
        if (respuestasuser[`Pregunta ${i}`][`respuesta`] === respuestasEmpresas[`Pregunta ${i}`][`respuesta`]) {
          score += parseFloat(respuestasEmpresas[`Pregunta ${i}`][`valor`]);
        }
        MaxScore += parseFloat(respuestasEmpresas[`Pregunta ${i}`][`valor`]);
      }
      porcentaje = ((score / MaxScore) * 100).toFixed(2);
      firebase.database().ref('/Empleados/' + empleadouid + '/cuestionario/').update({
        'puntaje': score,
        'maxscore': MaxScore,
        'porcentaje': porcentaje,
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Respuestas enviadas',
        });
      }).then(() => {
        window.location = 'resultados.html';
      });
    });
  });
}

function subscribe() {
  firebase.database().ref('/Empleados/' + localStorage.uid + '/cuestionario').on("value", function (snapshot) {
    if (!(snapshot.child('Pregunta 1').val() === '')) {
      firebase.database().ref('Empresas/' + localStorage.empresauid + '/Historial/' + localStorage.uid).set(
        snapshot.val()
      ).then(() => {
        firebase.database().ref('Empresas/' + localStorage.empresauid + '/Historial/' + localStorage.uid).update({
          'fecha': new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"})
        }
        )
      });
    }
  });
}