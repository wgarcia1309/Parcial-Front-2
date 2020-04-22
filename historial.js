const container = document.getElementById('tarjetas');
firebase.database().ref('/Empresas/' + localStorage.uid + '/Historial').once('value', function (snapshot) {
    var historial = Object.getOwnPropertyNames(snapshot.val());
    historial.forEach((empleado, idx) => {
        firebase.database().ref('/Empleados/' + empleado).once('value', function (snapshot2) {
            const card = document.createElement('div');
            card.classList = 'card-body';
            // Construct card content
            var nombreEmpleado = snapshot2.child('/nombre').val();
            var fecha = snapshot.child(empleado + '/fecha').val();
            const content = `
            <div id="user-${empleado}">
                <div class="card mb-12 shadow" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="./image/profile.jpg" class="card-img">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">Nombre: ${nombreEmpleado}</h4>
                                <p class="card-text">Fecha de realización: ${fecha}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            // Append newyly created card element to the container
            container.innerHTML += content;
        });
    });
});