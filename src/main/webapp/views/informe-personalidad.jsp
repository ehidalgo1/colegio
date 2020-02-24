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
						<h6>RUN: ${alumno.run}</h6>
                        <h6>Curso: ${alumno.curso.numeroCurso}</h6>
                        <div class="table-responsive mt-3">
                            <table class="table table-hover">
                                <thead>
                                <tr>
                                <th>AREA PERSONAL Y AFECTIVA</th>
                                <th>1� Semestre</th>
                                <th><button id="btn-primer-semestre" class="btn btn-sm btn-secondary rounded-circle"> + </button><button id="btn-guardar-primer-semestre" hidden="true" class="btn btn-sm btn-success rounded-circle">Ok</button></th>
                                <th>2� Semestre</th>
                                <th><button id="btn-segundo-semestre" class="btn btn-sm btn-secondary rounded-circle"> + </button><button id="btn-guardar-segundo-semestre" hidden="true" class="btn btn-sm btn-success rounded-circle">Ok</button></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cuida su higiene y presentaci�n personal</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Manifiesta una positiva autoestima o valoraci�n de s� mismo</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trata de superar sus errores</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trata de superar sus errores</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Logra tolerar frustraciones y sobreponerse a ellas</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Controla sus impulsos</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <thead>
                                <tr>
                                <th>AREA SOCIAL</th>
                                <th>1� Semestre</th>
                                <th>Opc</th>
                                <th>2� Semestre</th>
                                <th>Opc</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                        <td>Se integra a su grupo de pares</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Resuelve con autonom�a los problemas interpersonales que se le presentan</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Respeta las normas de convivencia establecidas por el colegio</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Manifiesta una actitud deferente y respetuosa con la comunidad</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Demuestra preocupaci�n y solidaridad por los problemas de los demas</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Respeta los bienes de uso com�n</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <thead>
                                <tr>
                                <th>AREA ACADEMICA</th>
                                <th>1� Semestre</th>
                                <th>Opc</th>
                                <th>2� Semestre</th>
                                <th>Opc</th>
                                </tr>
                                </thead>
                                <tbody>
                                	<tr>
                                        <td>Desarrolla el trabajo escolar en forma sist�mica y continua</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Es responsable con sus deberes escolares</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Participa activamente en clases, contribuyendo al buen desarrollo de esta</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>En su trabajo escolar demuestra emprendimiento</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Intercambia conocimientos y materiales con sus compa�eros</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trata de superar las dificultades acad�micas que enfrenta</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trabaja en clases en forma aut�noma de acuerdo a las situaciones dadas</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Manifiesta disposici�n para acatar las normas en el ambito acad�mico</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Se observa dispuesto y concentrado en la tarea que realiza</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Manifiesta una actitud positiva y participativa frente a las diferentes actividades que ofrece el colegio</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <c:import url="footer.jsp"></c:import>
    <script
		src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script
		src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/static/app_plugin/js/informe-personalidad.js"></script>
</body>
</html>