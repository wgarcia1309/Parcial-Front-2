firebase.database().ref('/Empresas/' + localStorage.empresauid + '/cuestionario').once('value', function (snapshot) {
  for (i = 1; i < 6; i++) {
    document.getElementById("pregunta" + i).innerHTML = snapshot.child('Pregunta ' + i + '/enunciado').val();
    for (j = 1; j < 5; j++) {
      document.getElementById(i + "opcion" + j).innerHTML = snapshot.child('Pregunta ' + i + '/opciones').val()[j - 1];
      document.getElementById(i + "op" + j).value = snapshot.child('Pregunta ' + i + '/opciones').val()[j - 1];
    }
  }
});
