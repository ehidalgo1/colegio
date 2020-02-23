<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!-- Contexto para URL -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!-- End Contexto -->
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
    <title>Informe personalidad</title>
    <link
	href="${pageContext.request.contextPath}/static/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/static/app_plugin/css/estilo.css"
	rel="stylesheet" />
</head>
<body>
<c:import url="menu.jsp"></c:import>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>Informe personalidad</h4>
            </div>
            <div class="card-body">
                <div class="row">
					<div class="col-md-12">
						<h6>Alumno: ${alumno.nombre} ${alumno.apellidoP}
							${alumno.apellidoM}</h6>
                        <h6>Curso: ${alumno.curso.numeroCurso}</h6>
                        <div class="table-responsive">
                            <table class="table table-hover">
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>