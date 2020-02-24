$('#btn-primer-semestre').click(function(){

    var input = "<input class='form-control' type='text'></input>";
    var contador = 1;

    $('td').each(function(i,item){

        console.log(item);

        if(contador === i){

            contador = contador + 5;

            $(this).html(input);
        }

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
