$(document).ready(function() {

});

$("#btn-editar-nota").click(function() {

    $(this).attr('hidden',true);

  var input = "";
  var nota = 0;

  $("tr td").each(function(i, item) {

    if (i > 0 && i < 9) {

      nota = item.textContent;

      input = "<input id='nota-"+i+"' type='text' class='form-control' />";
      

      $(this).html(input);

      $("#nota-"+i+"").val(nota);

    }

  });

  $('#btn-guardar-notas').prop('hidden',false);

});

$('#btn-guardar-notas').click(function(){


    var lista = [];
    var valorCelda = "";

    $("tr td").each(function(i, item) {

        if(i===0){

            valorCelda = item.textContent;

        }else if(i<9){

            valorCelda = $("#nota-"+i+"").val();
        }

          lista.push(valorCelda);

          if (i<9) {
            $(this).html(valorCelda);
          }
    
      });

      var token = $('#token-alumno').val();

      $.ajax({
          url: '/guardar-notas/'+token,
          type: 'post',
          data: JSON.stringify(lista),
          contentType: 'application/json',
          dataType: 'json',
          beforeSend: function(){

          },
          success: function(request){

            if(request===200){
                console.log("exito");

                //recargando pagina
                location.reload(true);
            }
              
          },
          error: function(){
            console.log("error");

          },
          complete: function(){

          }
      });

});
