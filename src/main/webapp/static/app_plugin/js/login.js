

$('.form-login').submit(function () {
    event.preventDefault();

    var usuario = $('#usuario').val();
    var password = $('#password').val();

    fd = new FormData();

    fd.append('usuario', usuario.toUpperCase());
    fd.append('password', password);

    $.ajax({
        url: '/iniciar-sesion',
        type: 'post',
        data: fd,
        beforeSend: function () {

        },
        success: function (request) {

            if (request === 200) {
                var url = "/home";
                window.location.replace(url);
            }else if(request === 100){

                alert("El usuario y o contrase\u00F1a no son validos");

            }


        },
        error: function () {

        },
        complete: function () {

        },
        processData: false,
        contentType: false,
        cache: false
        
    });
});