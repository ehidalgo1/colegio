$(document).ready(function () {

});

$('#seleccion-semestre').change(function () {
  $('#detalle-notas').prop('hidden', true);
});


//funcion redondear decimales
function redondeo(numero, decimales) {
  var flotante = parseFloat(numero);
  var resultado = Math.round(flotante * Math.pow(10, decimales)) / Math.pow(10, decimales);
  return resultado;
}

$('#btn-ver-notas').click(function () {

  var semestre = $('#seleccion-semestre').val();

  if (semestre !== '') {

    var runAlumno = $('#run-alumno').text();
    var parte = runAlumno.split(" ");
    var run = parte[1];


    $('#detalle-notas').prop('hidden', false);

    obtenerNotasPorSemestre(run,semestre);


  }

});

function obtenerNotasPorSemestre(run,semestre){

  $.ajax({
    url: '/obtener-notas-alumno/' + run + '/' + semestre,
    type: 'get',
    beforeSend: function () {

    },
    success: function (request) {
      var respuesta = JSON.stringify(request);
      var objeto = JSON.parse(respuesta);

      var lista = "";
      var ultimaLinea = "";
      var promedio = 0;
      var btnEditar = "";
      var btnGuardar = "";
      var promedioFinal = 0;


      $('#tabla-notas').empty();

      for (let i = 0; i < objeto.length; i++) {

        btnEditar = "<button id='btn-editar-nota-" + i + "' class='btn btn-secondary btn-sm rounded-circle' onclick='editarNotas(" + i + ")'>+</button>"
        btnGuardar = "<button id='btn-guardar-notas-" + i + "' class='btn btn-success btn-sm rounded-circle' hidden='true' onclick='guardarNotas(" + i + ")'>Ok</button>"

        promedio = (objeto[i].nota1 + objeto[i].nota2 + objeto[i].nota3 + objeto[i].nota4 + objeto[i].nota5 + objeto[i].nota6 + objeto[i].nota7 + objeto[i].nota8) / 8;

        promedioFinal = promedioFinal + promedio;

        lista = "<tr id='fila-" + i + "'><td>" + objeto[i].ramo.nombre + "</td><td>" + objeto[i].nota1 + "</td><td>" + objeto[i].nota2 + "</td><td>" + objeto[i].nota3 + "</td><td>" + objeto[i].nota4 + "</td><td>" + objeto[i].nota5 + "</td><td>" + objeto[i].nota6 + "</td><td>" + objeto[i].nota7 + "</td><td>" + objeto[i].nota8 + "</td><td>" + redondeo(promedio, 1) + "</td><td>" + btnEditar + " " + btnGuardar + "</td></tr>";

        $('#tabla-notas').append(lista);

      }

      promedioFinal = promedioFinal / objeto.length;

      ultimaLinea = "<thead><tr><th>PROMEDIO FINAL</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th id='promedio-final'>" + redondeo(promedioFinal, 1) + "</th></tr></thead>";

      $('#tabla-notas').append(ultimaLinea);


    },
    error: function () {
      console.log("error");

    },
    complete: function () {

    }
  });

};



function editarNotas(i) {

  $('#btn-editar-nota-' + i).attr('hidden', true);
  $('.btn-secondary').each(function (i, item) {
    $(this).attr('disabled', true);
  });

  $('#fila-' + i + ' td').each(function (i, item) {

    if (i > 0 && i < 9) {

      nota = item.textContent;

      input = "<input id='nota-" + i + "' name='nota' type='number' class='form-control' />";


      $(this).html(input);

      $("#nota-" + i + "").val(nota);

    }

  });

  $('#btn-guardar-notas-' + i).prop('hidden', false);


};



function guardarNotas(i) {

  

  var lista = [];
  var valorCelda = "";

  var semestre = $('#seleccion-semestre').val();
  var runAlumno = $('#run-alumno').text();
  var parte = runAlumno.split(" ");
  var run = parte[1];
  var promedioFinal = $('#promedio-final').text();

  console.log("promedio final:"+promedioFinal);

  $('#fila-' + i + ' td').each(function (i, item) {

    if (i === 0) {

      valorCelda = item.textContent;

    } else if (i < 9) {

      valorCelda = $("#nota-" + i + "").val();

      
    }
  

      lista.push(valorCelda);
    
   

    if (i < 9) {

      $(this).html(valorCelda);

    }

  });

  lista.push(promedioFinal);

  $.ajax({
    url: '/guardar-notas/'+run+'/'+semestre,
    type: 'post',
    data: JSON.stringify(lista),
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function () {

    },
    success: function (request) {

      if (request === 200) {
        console.log("exito");

        obtenerNotasPorSemestre(run,semestre);

      }

    },
    error: function () {
      console.log("error");

    },
    complete: function () {

    }
  });

};




$('#btn-descargar-notas').click(function(){


  var semestre = $('#seleccion-semestre').val();
  var runAlumno = $('#run-alumno').text();
  var parte = runAlumno.split(" ");
  var run = parte[1];

  $(location).attr('href','/exporta-informe-notas/'+run+'/'+semestre);


});


