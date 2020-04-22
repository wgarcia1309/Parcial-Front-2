const container = document.getElementById('useranswer');
getdata();

function datagraph(empresa){
    for (i=1;i<=5;i++){
        mx+=parseFloat(empresa.child(`cuestionario/Pregunta ${i}/valor`).val());
        r1=empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta '+i).val();
        r2=empresa.child(`cuestionario/Pregunta ${i}/respuesta`).val();
        if(r1===r2){
            total+=parseFloat(empresa.child(`cuestionario/Pregunta ${i}/valor`).val());
        }
    }
    return total/mx*100;
}
function getdata() {
    mx=0.0,total=0.0,porcentaje=0.0;
    firebase.database().ref('/Empresas/' + localStorage.uid).once('value', function (empresa) {
        
        porcentaje=datagraph(empresa)
        var restante = 100 - porcentaje;
        const graficos = `
        <h6>${total}/${mx}</h6>
        <div class="progress mb-3">
            <div id="progress" class="progress-bar bg-dark progress-bar-striped" role="progressbar"
                style="width: ${porcentaje}%" aria-valuemin="0"
                aria-valuemax="100"></div>
            <div id="progress2" class="progress-bar bg-warning" role="progressbar"
                style="width: ${restante}%" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        `; 

    container.innerHTML+=`
        <section class="center-section ml-3 mr-3">
            <div class="questions-bg mt-2 mb-3 p-3 shadow-lg">
                <div class="form-group">
                    <h2>Resultados</h2>
                    <hr>
                    ${graficos}
                    <hr>
                    <h4>${empresa.child('cuestionario/Pregunta 1/enunciado').val()}</h4>
                    <h3>respuesta:${empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta 1').val()}</h3>
                    <h3>respuesta correcta:${empresa.child('cuestionario/Pregunta 1/respuesta').val()}</h3>
                    <h3>${get_points(empresa,1)}</h3>

                    <hr>
                    <h4>${empresa.child('cuestionario/Pregunta 2/enunciado').val()}</h4>
                    <h3>respuesta:${empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta 2').val()}</h3>
                    <h3>respuesta correcta:${empresa.child('cuestionario/Pregunta 2/respuesta').val()}</h3>
                    <h3>${get_points(empresa,2)}</h3>


                    <hr>
                    <h4>${empresa.child('cuestionario/Pregunta 3/enunciado').val()}</h4>
                    <h3>respuesta:${empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta 3').val()}</h3>
                    <h3>respuesta correcta:${empresa.child('cuestionario/Pregunta 3/respuesta').val()}</h3>
                    <h3>${get_points(empresa,3)}</h3>


                    <hr>
                    <h4>${empresa.child('cuestionario/Pregunta 4/enunciado').val()}</h4>
                    <h3>respuesta:${empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta 4').val()}</h3>
                    <h3>respuesta correcta:${empresa.child('cuestionario/Pregunta 4/respuesta').val()}</h3>
                    <h3>${get_points(empresa,4)}</h3>


                    <hr>
                    <h4>${empresa.child('cuestionario/Pregunta 5/enunciado').val()}</h4>
                    <h3>respuesta:${empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta 5').val()}</h3>
                    <h3>respuesta correcta:${empresa.child('cuestionario/Pregunta 5/respuesta').val()}</h3>
                    <h3>${get_points(empresa,5)}</h3>
                </div>            
            </div>
        </section>
        
        `
    })
}

function get_points(empresa,i){
    
    r1=empresa.child('Historial/'+localStorage.employeeuid+'/Pregunta '+i).val();
    r2=empresa.child(`cuestionario/Pregunta ${i}/respuesta`).val();
    if(r1===r2){
        return   `puntos : ${parseFloat(empresa.child(`cuestionario/Pregunta ${i}/valor`).val())}`
    }else{
        return'0';
    }
}
