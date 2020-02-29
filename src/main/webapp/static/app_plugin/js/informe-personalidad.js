$("#seleccion-semestre").change(function() {
  $("#informe-personalidad").prop("hidden", true);
});

$("#btn-ver-informe").click(function() {
  var semestre = $("#seleccion-semestre").val();
  var runAlumno = $("#run-alumno").text();
  var parte = runAlumno.split(" ");
  var run = parte[1];

  if (semestre !== "") {
    $("#informe-personalidad").prop("hidden", false);

    obtenerInformePersonalidad(run, semestre);
  }
});

function obtenerInformePersonalidad(run, semestre) {
  $.ajax({
    url: "/obtener-personalidad-alumno/" + run + "/" + semestre,
    type: "get",
    beforeSend: function() {},
    success: function(request) {
      var respuesta = JSON.stringify(request);
      var objeto = JSON.parse(respuesta);

      var contador = 1;
      var td = "";
      var elemento = "";

      $("td").each(function(i, item) {
        switch (contador) {
          case 1:
            elemento = objeto.higienePresentacion;

            break;
          case 4:
            elemento = objeto.autoestimaValoracion;
            break;
          case 7:
            elemento = objeto.superaErrores;

            break;
          case 10:
            elemento = objeto.toleraFrustraciones;

            break;
          case 13:
            elemento = objeto.controlaImpulsos;

            break;
          case 16:
            elemento = objeto.integraGrupo;

            break;
          case 19:
            elemento = objeto.resuelveProblemasInterpersonales;

            break;
          case 22:
            elemento = objeto.respetaNormasConvivencia;

            break;
          case 25:
            elemento = objeto.actitudRespetuosa;

            break;
          case 28:
            elemento = objeto.preocupacionSolidaridad;

            break;
          case 31:
            elemento = objeto.respetaBienes;

            break;
          case 34:
            elemento = objeto.trabajoContinuo;

            break;
          case 37:
            elemento = objeto.responsableDeberes;

            break;
          case 40:
            elemento = objeto.participaClases;

            break;
          case 43:
            elemento = objeto.demuestraEmprendimiento;

            break;
          case 46:
            elemento = objeto.intercambiaConocimientos;

            break;
          case 49:
            elemento = objeto.superaDificultades;

            break;
          case 52:
            elemento = objeto.trabajaClases;

            break;
          case 55:
            elemento = objeto.acataNormas;

            break;
          case 58:
            elemento = objeto.dispuestoConcentrado;

            break;
          case 61:
            elemento = objeto.positivoParticipativo;

            break;
          case 64:
            elemento = objeto.observaciones;

            break;
        }

        if (i === contador) {
          $(this).html(elemento);

          contador = contador + 3;
        }
      });
    },
    error: function() {
      console.log("error al obtener el informe");
    },
    complete: function() {}
  });
}

$("#btn-editar-personalidad").click(function() {
  $(this).attr("hidden", true);
  $("#btn-guardar-informe-personalidad").prop("hidden", false);

  var input =
    "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='S'>Siempre</option><option value='G'>Generalmente</option><option value='O'>Ocacionalmente</option><option value='N'>Nunca</option><option value='NO'>No Observable</option></select>";
  var contador = 1;
  var valorTextArea = "";

  $("td").each(function(i, item) {
    if (contador === i) {
      switch (item.textContent) {
        case "SIEMPRE":
          input =
            "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='SIEMPRE' selected>Siempre</option><option value='GENERALMENTE'>Generalmente</option><option value='OCACIONALMENTE'>Ocacionalmente</option><option value='NUNCA'>Nunca</option><option value='NO OBSERVABLE'>No Observable</option></select>";
          break;
        case "GENERALMENTE":
          input =
          "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='SIEMPRE'>Siempre</option><option value='GENERALMENTE' selected>Generalmente</option><option value='OCACIONALMENTE'>Ocacionalmente</option><option value='NUNCA'>Nunca</option><option value='NO OBSERVABLE'>No Observable</option></select>";
          break;
        case "OCACIONALMENTE":
          input =
          "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='SIEMPRE'>Siempre</option><option value='GENERALMENTE'>Generalmente</option><option value='OCACIONALMENTE' selected>Ocacionalmente</option><option value='NUNCA'>Nunca</option><option value='NO OBSERVABLE'>No Observable</option></select>";
          break;
        case "NUNCA":
          input =
          "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='SIEMPRE'>Siempre</option><option value='GENERALMENTE'>Generalmente</option><option value='OCACIONALMENTE'>Ocacionalmente</option><option value='NUNCA' selected>Nunca</option><option value='NO OBSERVABLE'>No Observable</option></select>";
          break;
        case "NO OBSERVABLE":
          input =
          "<select class='form-control' id='selection-respuesta'><option value=''>Seleccione</option><option value='SIEMPRE'>Siempre</option><option value='GENERALMENTE'>Generalmente</option><option value='OCACIONALMENTE'>Ocacionalmente</option><option value='NUNCA'>Nunca</option><option value='NO OBSERVABLE' selected>No Observable</option></select>";
          break;
        case "":
          input =
          "<select class='form-control' id='selection-respuesta'><option value='' selected>Seleccione</option><option value='SIEMPRE'>Siempre</option><option value='GENERALMENTE'>Generalmente</option><option value='OCACIONALMENTE'>Ocacionalmente</option><option value='NUNCA'>Nunca</option><option value='NO OBSERVABLE'>No Observable</option></select>";
          break;

        default:
          break;
      }

      if (i === 64) {
        valorTextArea = item.textContent;

        input =
          "<textarea class='form-control' id='comentario' rows='3'></textarea>";
      }

      $(this).html(input);

      contador = contador + 3;
    }
  });

  $("#comentario").val(valorTextArea);
});

$("#btn-guardar-informe-personalidad").click(function() {
  var input = "";
  var semestre = $("#seleccion-semestre").val();
  var campoRun = $("#run-alumno").text();
  var parte = campoRun.split(" ");
  var run = parte[1];

  var fd = new FormData();

  $("select").each(function(i, item) {
    input = item.value;

    if (i > 0) {
      fd.append("campo_" + i, input);
    }
  });

  var comentario = $("#comentario").val();

  fd.append("comentario", comentario);

  $.ajax({
    url: "/guardar-informe-personalidad/" + run + "/" + semestre,
    type: "post",
    data: fd,
    beforeSend: function() {},
    success: function(request) {
      if (request === 200) {
        // location.reload(true)
        var valorInput = "";
        var lista = "";

        $("select").each(function(i, item) {

          if (i > 0) {

            valorInput = item.options[item.selectedIndex].value;

            $(this).replaceWith(valorInput);

            $('#btn-editar-personalidad').prop('hidden',false);

          }

        });

        $('#comentario').replaceWith(comentario);


        $('#btn-guardar-informe-personalidad').prop('hidden',true);

      }


    },
    error: function() {
      console.log("error al guardar los datos primer semestre");
    },
    complete: function() {},
    cache: false,
    contentType: false,
    processData: false
  });
});

$("#btn-segundo-semestre").click(function() {
  var input = "<input class='form-control' type='text'></input>";
  var contador = 3;

  $("td").each(function(i, item) {
    console.log(item);

    if (contador === i) {
      contador = contador + 5;

      $(this).html(input);
    }
  });
});

$("#btn-descargar-personalidad").click(function() {
  var semestre = $("#seleccion-semestre").val();
  var runAlumno = $("#run-alumno").text();
  var parte = runAlumno.split(" ");
  var run = parte[1];

  $(location).attr('href','/exporta-informe-personalidad/' + run + '/' + semestre);

  
});
