function mensajePasswordCambiada() { swal("Contrase\u00f1a Cambiada", "Se ha cambiado la contrase\u00f1a exitosamente", "success") };


$('#btn-cambiar-password').click(function(){

    console.log('abriendo modal');

    $('#modal-cambiar-password').modal('show');

});


$('#form-cambiar-password').submit(function(event){

    event.preventDefault();

    let new_password = $('#new-password').val();
    let confirm_password = $('#confirm-password').val();
    let token = $('#token-profesor').val();

    if(new_password!=='' && confirm_password!==''){

        if(new_password===confirm_password){


            let fd = new FormData();

            fd.append('password',new_password);

            $.ajax({
                url: 'cambiar-password-profesor/'+token,
                type: 'post',
                data: fd,
                beforeSend: function(){

                },
                success: function(request){

                    if(request===200){

                        $('#modal-cambiar-password').modal('hide');

                        mensajePasswordCambiada();

                    }

                },
                error: function(){
                    alert('ha ocurrido un error de servidor, intentelo nuevamente');
                },
                complete: function(){

                },
                cache: false,
                contentType: false,
                processData: false
            });



        }else{


            alert('las contrase\u00f1as no coinciden');

        }

    }

});


