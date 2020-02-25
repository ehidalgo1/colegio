$('#btn-primer-semestre').click(function(){

    $(this).attr('hidden',true);
    $('#btn-guardar-primer-semestre').prop('hidden', false);
    var input = "<input class='form-control' type='text'></input>";
    var contador = 1;

    $('td').each(function(i,item){

        if(contador === i){

            contador = contador + 5;

            $(this).html(input);
        }

    });
});

$('#btn-guardar-primer-semestre').click(function(){

    var input = "";
    var campoRun = $('#run').text();
    var parte = campoRun.split(" ");
    var run = parte[1];

    var listaPersonalidadPrimer = [];

    var fd = new FormData();

    $('input').each(function(i,item){

        input = item.value

        fd.append('campo_'+i,input);

    });

    $.ajax({
        url: 'guardar-personalidad-primer-semestre/'+run,
        type: 'post',
        data: fd,
        beforeSend: function(){

        },
        success: function(request){

            if(request===200){
                location.reload(true);
            }

        },
        error: function(){
            console.log('error al guardar los datos primer semestre');
        },
        complete: function(){

        },
        cache: false,
        contentType: false,
        processData: false
    });

});


$('#btn-segundo-semestre').click(function(){

    var input = "<input class='form-control' type='text'></input>";
    var contador = 3;

    $('td').each(function(i,item){

        console.log(item);

        if(contador === i){

            contador = contador + 5;

            $(this).html(input);
        }

    });

});
