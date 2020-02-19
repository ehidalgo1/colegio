


$(document).ready(function(){
    $('#tabla-listado-ftp').DataTable();
    cargarListaFtp();
});


function cargarListaFtp() {

    $.ajax({
        url: "lista-carga-ftp",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforesend: function () {
            $('#preloader').show();
        },
        success: function (request) {

            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            var tabla = $('#tabla-listado-ftp').DataTable();
            tabla.clear().draw();

            var bl = "";
            var oc = "";
            var nroContainer = "";
            var fecha = "";
            var dia = "";
            var mes = "";
            var fechaFinal = "";


            for (i = 0; i < objeto.length; i++) {

                bl = objeto[i].blNr;
                bl.trim();
                oc = objeto[i].poNrShipment;
                oc.trim();
                nroContainer = objeto[i].containerNr;
                nroContainer.trim();
                fecha = new Date(objeto[i].procesoCarga.fechaCreacionProceso);
                dia = fecha.getDate();
                mes = fecha.getMonth() + 1;

                if (dia<10) {
                    dia = "0"+dia;
                }

                if (mes<10) {
                    mes = "0"+mes;
                }

                fechaFinal = dia + "/" + mes + "/" + fecha.getFullYear();

                tabla.row.add([
                    bl,oc,nroContainer,fechaFinal
                ]).draw(false);
                
            }
        },
        error: function () {
            $('#preloader').fadeOut();
        },
        complete: function () {
            $('#preloader').fadeOut();
        }
    });
}



$('.filtro-busqueda').submit(function (event) {
    event.preventDefault();

    var bl = $('#filtrar-bl').val();
    var oc = $('#filtrar-oc').val();
    var contenedor = $('#filtrar-contenedor').val();

    bl.trim();
    oc.trim();
    contenedor.trim();

    $.ajax({
        url: "lista-carga-ftp",
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function () {
            $('#preloader').show();
        },
        success: function (request) {

            var resultado = JSON.stringify(request);
            var objeto = JSON.parse(resultado);
            var dia = "";
            var mes = "";
            var fechaFinal = "";
            var valorBl = "";
            var valorOc = "";
            var ValorContenedor = "";


            var contador = 1;

            var tabla = $('#tabla-listado-ftp').DataTable();

            tabla.clear().draw();

            var listaFtp = [];

            for (i = 0; i < objeto.length; i++) {

                fecha = new Date(objeto[i].procesoCarga.fechaCreacionProceso);
                dia = fecha.getDate();
                mes = fecha.getMonth() + 1;

                if (dia<10) {
                    dia = "0"+dia;
                }
                if (mes<10) {
                    mes = "0"+mes;
                }

                fechaFinal = dia + "/" + mes + "/" + fecha.getFullYear();

                valorBl = objeto[i].blNr.trim();
                valorOc = objeto[i].poNrShipment.trim();
                ValorContenedor = objeto[i].containerNr.trim();

                if (((valorBl.indexOf(bl !== -1) && (bl.length >= 3)) && ((valorOc.indexOf(oc) !== -1) && (oc.length >= 3)) && ((ValorContenedor.indexOf(contenedor) !== -1) && (contenedor.length >= 3)))) {
                    
                    // console.log('entrando con los 3 campos');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((valorBl.indexOf(bl) !== -1) && (bl >= 3)) && ((valorOc.indexOf(oc) !== -1) && (oc.length >= 3)) && ((contenedor == '') && (contenedor < 2))) {
                    
                    // console.log('entrando con bl y oc');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((bl == '') && (bl.length < 2)) && ((valorOc.indexOf(oc) !== -1) && (oc.length >= 3)) && ((ValorContenedor.indexOf(contenedor) !== -1) && (contenedor.length >= 3))) {
                    
                    // console.log('entrando con oc y contenedor');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((valorBl.indexOf(bl) !== -1) && (bl.length >= 3)) && ((oc == '') && (oc < 2)) && ((ValorContenedor.indexOf(contenedor) !== -1) && (contenedor.length >= 3))) {
                    
                    // console.log('entrando con bl y contenedor');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((valorBl.indexOf(bl) !== -1) && (bl.length >= 3)) && ((oc == '') && (oc.length < 2)) && ((contenedor == '') && (contenedor.length < 2))) {
                    
                    // console.log('entrando con bl');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((bl == '') && (bl.length < 2)) && (valorOc.indexOf(oc) !== -1) && ((contenedor == '') && (contenedor.length < 2))) {
                    
                    // console.log('entrando con oc');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((bl == '') && (bl.length < 2)) && ((oc == '') && (oc.length < 2)) && ((ValorContenedor.indexOf(contenedor) !== -1) && (contenedor.length >= 3))) {
                
                    // console.log('entrando con contenedor');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);

                } else if (((bl == '') && (bl.length < 2)) && ((oc == '') && (oc.length < 2)) && ((contenedor == '') && (contenedor.length < 2))) {
                    
                    // console.log('busqueda en blanco');

                    tabla.row.add([
                        valorBl,valorOc,ValorContenedor,fechaFinal
                    ]).draw(false);
                    
                } else {
                    // fila = "<tr><td>No se encontraron resultados para la busqueda</td></tr>"
                    // $('#tabla-listado-ftp').append(fila);
                    // console.log('busqueda no coincide');
                }

                contador = contador + 1;

            }//fin for
        },
        error: function () {
            $('#preloader').fadeOut();

        },
        complete: function () {
            $('#preloader').fadeOut();
        }
    });

    // console.log($(this).text());

});


