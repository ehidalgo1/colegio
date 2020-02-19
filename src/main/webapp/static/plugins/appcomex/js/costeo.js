

$(document).ready(function(){
    $('#seleccion-referencia').select2();
    obtenerListaReferenciaBlOc();
});


function obtenerListaReferenciaBlOc() {

    $.ajax({
        url: "lista-referencia-bl-oc",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforesend: function () {

        },
        success: function (request) {

            $('#seleccion-referencia').empty();
            var opcion = "<option value='' class='form-control' selected>Seleccione</option>";

            for (let i = 0; i < request.length; i++) {

                $('#seleccion-referencia').append(opcion);
                opcion = "<option value=" + request[i] + " class='form-control'>" + request[i] + "</option>"

            }

        },
        error: function (status, request, error) {

        },
        complete: function () {

        }

    });
};

$('#seleccion-referencia').change(function(event){

    $('#detalle-costeo').attr('hidden', true);

});

$('.form-ver-detalle-costeo').submit(function (event) {
    event.preventDefault();

    

    if ($('#seleccion-referencia').val() != '') {
        $('#preloader').show();

        $('#detalle-costeo').attr('hidden', false);

        $('#preloader').fadeOut();

    }


});

jQuery(".form-ver-detalle-costeo").validate({
    ignore: [], errorClass: "invalid-feedback animated fadeInDown", errorElement: "div", errorPlacement: function (e, a) {
        jQuery(a).parents(".form-group > div").append(e)
    },
    highlight: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid").addClass("is-invalid")
    },
    success: function (e) {
        jQuery(e).closest(".form-group").removeClass("is-invalid"), jQuery(e).remove()
    },
    rules: {
        "seleccion-referencia": {
            required: !0
        }
    },
    messages: {
        "seleccion-referencia": {
            required: "Seleccione una referencia"
        }
    }
});
