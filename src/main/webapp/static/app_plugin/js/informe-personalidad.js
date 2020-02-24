

$('#btn-primer-semestre').click(function(){

    var input = "<input class='form-control' type='text'></input>";
    var contador = 0;

    $('td').each(function(i,item){

        // if(i===1){

        //     $(this).html(input);

            

        // }
        console.log(item);

        contador = contador +6;

        if(contador > i){
            // console.log(contador);

            contador = contador -1;

            $(this).html(input);
        }

        

    });
});