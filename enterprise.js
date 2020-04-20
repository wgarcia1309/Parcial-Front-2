var empresa = firebase.database().ref('Empresas/' + localStorage.uid);
/*vincular con el html*/
empresa.once('value')
  .then(function (snapshot) {
    console.log(snapshot.val())
  });

/**/
$("#registrarCuestionario").click(function createQuestions() {
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
  )
});

