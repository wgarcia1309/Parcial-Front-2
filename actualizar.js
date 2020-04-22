firebase.database().ref('/Empleados/' + sessionStorage.getItem("empleadotoupdate")).once('value', function (snapshot) {
    document.getElementById("direccion").value = snapshot.child('/direccion').val();
    document.getElementById("nombreOperador").value = snapshot.child('/nombre').val();
});