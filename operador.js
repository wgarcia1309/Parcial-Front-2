const container = document.getElementById('tarjetas');
firebase.database().ref('/Empresas/' + localStorage.uid).once('value', function (snapshot) {
    document.getElementById("compañiaNombre").innerHTML = snapshot.child('/Nombre').val();
    document.getElementById("representanteNombre").innerHTML = snapshot.child('/representante').val();
    document.getElementById("representanteTel").innerHTML = "Tel: " + snapshot.child('/Teléfono').val();
    document.getElementById("representanteCorreo").innerHTML = snapshot.child('/Correo').val();
});

firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados').once('value', function (snapshot) {
    var empleados = Object.getOwnPropertyNames(snapshot.val());
    empleados.forEach((empleado, idx) => {
        firebase.database().ref('/Empleados/' + empleado).once('value', function (snapshot) {
            // Create card element
            const card = document.createElement('div');
            card.classList = 'card-body';
            // Construct card content
            var restante = 100 - snapshot.child('/cuestionario/porcentaje').val();
            var estado = snapshot.child('estado').val() ? "Deshabilitar" : "Habilitar";
            const graficos = `
            <h6>${snapshot.child('/cuestionario/puntaje').val()}/${snapshot.child('/cuestionario/maxscore').val()}
            </h6>
            <div class="progress mb-3">
                <div id="progress" class="progress-bar bg-dark progress-bar-striped" role="progressbar"
                    style="width: ${snapshot.child('/cuestionario/porcentaje').val()}%" aria-valuemin="0"
                    aria-valuemax="100"></div>
                <div id="progress2" class="progress-bar bg-warning" role="progressbar"
                    style="width: ${restante}%" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            `;
            var didTheTest = snapshot.child('cuestionario/Pregunta 1').val() === "" ? "" : graficos;
            const content = `
            <div class="card mb-12 shadow" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="./image/profile.jpg" class="card-img">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">${snapshot.child('/nombre').val()}</h4>
                        <p class="card-text">${snapshot.child('/direccion').val()}</p>
                        ${didTheTest}
                        <div>
                            <a class="btn btn-dark shadow enable">${estado}</a>
                            <a href="" class="btn btn-dark shadow">Eliminar Evaluacion</a>
                            <a href="" class="btn btn-dark shadow">Actualizar información</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;


            // Append newyly created card element to the container
            container.innerHTML += content;
        });
    })
}).then(() => {
    $('.enable').click(function (event) {
        let target = $(event.target);
        target.addClass('disabled');
        if (target.text() === "Habilitar") {
            enableEmployee(localStorage.employeeuid, target)
        } else {
            disableEmployee(localStorage.employeeuid, target)
        }
    })
});