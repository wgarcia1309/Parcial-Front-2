window.onload = getprofile();

function getprofile(){
    firebase.database().ref('/Empleados/' + localStorage.uid).once('value').then(function (snapshot) {
        console.log(snapshot.val())
        $("#titulo").text(snapshot.child('nombre').val());
        $("#username").text(snapshot.child('nombre').val());
        $("#userdir").text(snapshot.child('direccion').val());
        $("#profilepic").attr('src',snapshot.child('foto').val());
        if(snapshot.child('cuestionario').child('Pregunta 1').val()===""){
          $("#evaluationbutton").removeClass("invisible");
        }else{
          $("#resultsbutton").removeClass("invisible");
        }
    })
  }
