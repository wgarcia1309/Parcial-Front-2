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
            firebase.database().ref('/Empleados/' + empleado).once('value', function (snapshot) {
                // Create card element
                const card = document.createElement('div');
                card.classList = 'card-body';
                // Construct card content

                var estado = snapshot.child('estado').val() ? "Deshabilitar" : "Habilitar";
                var hide = snapshot.child('cuestionario/Pregunta 1').val() === "" ? "d-none" : "";

                const content = `
            <div id="user-${empleado}" class="col-6 card  mb-12 shadow" style="max-width: 420px;">
                    <div class="row no-gutters">
                        <div class="col-12 col-md-12 col-lg-4 col-xl-4 mt-3">
                            <img src="./image/profile.jpg" class="card-img">
                        </div>
                        <div class="col-12 col-md-12 col-lg-8 col-xl-8 mt-3">
                            <div class="card-body">
                                <h4 class=" text-center card-title">${snapshot.child('/nombre').val()}</h4>
                                <p class=" text-center card-text">${snapshot.child('/direccion').val()}</p>
                                <div>
                                    <div id="en-${empleado}" class="btn btn-dark col-12 mb-1 shadow enable ">${estado}</div>
                                    <div id="rmq-${empleado}" class="btn btn-dark col-12 mb-1 shadow deleteqtn ">Eliminar Evaluacion</div>
                                    <!-- Button trigger modal -->
                                    <div id="eval-${empleado}" class="btn btn-dark col-12 mb-1 showqtn"> 
                                    Ver Evaluacion
                                    </div>
                                    <a href="actualizar.html" id="act-${empleado}"class="btn btn-dark col-12 mb-1 shadow update">Actualizar información</a>
                                    <div id="del-${empleado}" class="btn btn-dark col-12 mb-1 shadow delEmp">Eliminar empleado</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
`;
                nombres[empleado] = snapshot.child('/nombre').val();
                first[empleado] = true;
              
                subscribe(empleado)
                // Append newyly created card element to the container
                container.innerHTML += content;
            }).then(() => {
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
                    localStorage.employeeuid = target.attr("id").substring(5);
                    window.location="viewscore.html"
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
                first[employeeuid] = false;
            }else{
                $("#navbarNav").notify(nombres[employeeuid] + " ha realizado una encuesta", { position: "bottom", className: "info" });
            }
            $('#rmq-' + employeeuid).removeClass('d-none');
            $('#eval-' + employeeuid).removeClass('d-none');
        }
    });
}
