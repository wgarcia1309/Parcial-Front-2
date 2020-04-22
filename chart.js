firebase.database().ref('/Empleados/' + localStorage.uid).once('value', function (snapshot) {
    var puntos = parseInt(snapshot.child('/cuestionario/puntaje').val());
    var maxscore = parseInt(snapshot.child('/cuestionario/maxscore').val())
    new Chart(document.getElementById("chart"), {
        type: 'doughnut',
        data: {
            labels: ["Puntaje Correcto", "Puntaje Incorrecto"],
            datasets: [
                {
                    label: "puntaje (millions)",
                    backgroundColor: ["#3e95cd", "#8e5ea2"],
                    data: [puntos, maxscore-puntos]
                }
            ]

        },
        options: {
            title: {
                display: true,
                text: 'Resultado Operador'
            }
        }
    });
});
