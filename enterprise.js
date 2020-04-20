var empresa = firebase.database().ref('Empresas/'+localStorage.uid);
/*vincular con el html*/
empresa.once('value')
  .then(function(snapshot) {
    console.log(snapshot.val())
  });

  /**/
  function createQuestions() {
    cuestionario = firebase.database().ref('Empresas/'+localStorage.uid+'/cuestionario')
    cuestionario.set({
      'Pregunta 1':{
                    'enunciado':'Holaaa',
                    'valor':20,
                    'opciones': ['a','b','c','d'],
                    'respuesta':'a'
                  },
      'Pregunta 2':{
                    'enunciado':'estoy',
                    'valor':30,
                    'opciones': ['a','b','c','d'],
                    'respuesta':'a'
                  },
      'Pregunta 3':{
                    'enunciado':'re',
                    'valor':10,
                    'opciones': ['a','b','c','d'],
                    'respuesta':'a'
                  },
      'Pregunta 4':{
                    'enunciado':'cansado',
                    'valor':10,
                    'opciones': ['a','b','c','d'],
                    'respuesta':'a'
                  },
      'Pregunta 5':{
                    'enunciado':':c',
                    'valor':30,
                    'opciones': ['a','b','c','d'],
                    'respuesta':'a'
                  }
    }).then(
      Swal.fire({
          icon:  'success',
          title: 'Su cuestionario ha sido creado',
      })
)

  }