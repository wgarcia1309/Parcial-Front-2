const container = document.getElementById('tarjetas');
firebase.database().ref('/Empresas/' + localStorage.uid).once('value', function (snapshot) {
    document.getElementById("compañiaNombre").innerHTML = snapshot.child('/Nombre').val();
    document.getElementById("representanteNombre").innerHTML = snapshot.child('/representante').val();
    document.getElementById("representanteTel").innerHTML = "Tel: " + snapshot.child('/Teléfono').val();
    document.getElementById("representanteCorreo").innerHTML = snapshot.child('/Correo').val();
});

var nombres = [];
var first = []
insertEmployees();

function insertEmployees() {
    firebase.database().ref('/Empresas/' + localStorage.uid + '/Empleados').once('value', function (snapshot) {
        var empleados = Object.getOwnPropertyNames(snapshot.val());
        empleados.forEach((empleado, idx) => {
            notificaciones = "";
            firebase.database().ref('/Empleados/' + empleado).once('value', function (snapshot) {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';
                // Construct card content
                var restante = 100 - snapshot.child('/cuestionario/porcentaje').val();
                var estado = snapshot.child('estado').val() ? "Deshabilitar" : "Habilitar";
                var hide = snapshot.child('cuestionario/Pregunta 1').val() === "" ? "d-none" : "";
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
                const content = `
            <div id="user-${empleado}">
                <div class="card mb-12 shadow" style="max-width: 540px;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="./image/profile.jpg" class="card-img">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h4 class="card-title">${snapshot.child('/nombre').val()}</h4>
                                <p class="card-text">${snapshot.child('/direccion').val()}</p>
                                <div>
                                    <div id="en-${empleado}" class="btn btn-dark shadow enable">${estado}</div>
                                    <div id="rmq-${empleado}" class="btn btn-dark shadow deleteqtn ">Eliminar Evaluacion</div>
                                    <div id="eval-${empleado}" class="btn btn-dark shadow showqtn ">Ver Evaluacion</div>
                                    <a href="actualizar.html" id="act-${empleado}"class="btn btn-dark shadow update">Actualizar información</a>
                                    <div id="del-${empleado}" class="btn btn-dark shadow delEmp">Eliminar empleado</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
`;

                nombres[empleado] = snapshot.child('/nombre').val();
                first[empleado] = true;
                notificaciones += `
            <div id="${empleado}-${snapshot.child('/nombre').val()}" class="notify">
            </div>`
                subscribe(empleado)
                // Append newyly created card element to the container
                container.innerHTML += content;
            }).then(() => {
                container.innerHTML += notificaciones;
                $('.enable').click(function (event) {
                    let target = $(event.target);
                    target.addClass('disabled');
                    if (target.text() === "Habilitar") {
                        enableEmployee(target.attr("id").substring(3), target)
                    } else {
                        disableEmployee(target.attr("id").substring(3), target)
                    }
                });

                $('.update').click(function (event) {
                    let target = $(event.target);
                    sessionStorage.setItem("empleadotoupdate", target.attr("id").substring(4));
                });

                $('.deleteqtn').click(function (event) {
                    localStorage.status = "INDIVIDUAL"
                    let target = $(event.target);
                    let uid = target.attr("id").substring(4);
                    removeEmployeeAnswer(uid);
                })
                /*modal */
                $(".showqtn").click(function (event) {
                    let target = $(event.target);
                    let uid = target.attr("id").substring(5);
                })
                $(".delEmp").click(function (event) {
                    let target = $(event.target);
                    let uid = target.attr("id").substring(4);
                    removeEmployee(uid)
                })
            });
        })
    })
}

function removebox(uid) {
    var element = document.getElementById('user-' + uid);
    element.parentNode.removeChild(element);
}


function subscribe(employeeuid) {
    firebase.database().ref('/Empleados/' + employeeuid + '/cuestionario').on("value", function (snapshot) {
        if (snapshot.child('Pregunta 1').val() === '') {
            $('#rmq-' + employeeuid).addClass('d-none');
            $('#eval-' + employeeuid).addClass('d-none');
        } else {
            if (first[employeeuid]) {
                first[employeeuid] = !first[employeeuid];
            } else {
                $("#navbarNav").notify(nombres[employeeuid] + " ha realizado una encuesta", { position: "bottom", className: "info" });
            }

            $('#rmq-' + employeeuid).removeClass('d-none');
            $('#eval-' + employeeuid).removeClass('d-none');
        }
    });
}
