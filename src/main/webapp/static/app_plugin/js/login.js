

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