firebase.database().ref('/Empleados/' + localStorage.uid).once('value', function (snapshot) {
    document.getElementById("empleadoNombre").innerHTML = snapshot.child('/nombre').val();
    console.log(snapshot.child('/nombre').val());
    document.getElementById("score").innerHTML = snapshot.child('/cuestionario/puntaje').val()+"/"+snapshot.child('/cuestionario/maxscore').val();
    console.log(snapshot.child('/cuestionario/puntaje').val()+"/"+snapshot.child('/cuestionario/maxscore').val());
    document.getElementById("progress").style.width = snapshot.child('/cuestionario/porcentaje').val()+"%";
    console.log(snapshot.child('/cuestionario/porcentaje').val());
    document.getElementById("progress2").style.width = (100-snapshot.child('/cuestionario/porcentaje').val())+"%";
    console.log(100-snapshot.child('/cuestionario/porcentaje').val());
});