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
<title>home</title>
<link
	href="${pageContext.request.contextPath}/static/css/bootstrap.min.css"
	rel="stylesheet" />
<link
	href="${pageContext.request.contextPath}/static/app_plugin/css/estilo.css"
	rel="stylesheet" />
<title>Informe notas</title>
</head>
<body>
	<c:import url="menu.jsp"></c:import>
	<div class="container-fluid">
		<div class="card shadow">
			<div class="card-header">
				<h4>Notas Alumno</h4>
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-md-6">
						<h6>Alumno: ${alumno.nombre} ${alumno.apellidoP}
							${alumno.apellidoM}</h6>
						<h6 id="run-alumno">RUN: ${alumno.run}</h6>
						<h6>Curso: ${alumno.curso.numeroCurso}</h6>
						<input id="token-alumno" type="text" value="${alumno.token}"
							hidden="true" readonly="readonly">
					</div>
					<div class="col-md-6">
						<div class="form-group row">
							<h6 class="col-md-3">Semestre:</h6>
							<div class="col-md-5">
								<select id="seleccion-semestre" class="form-control">
									<option value="">Seleccione</option>
									<c:forEach items="${listaSemestres}" var="sem">
										<option value="${sem.idSemestre}">${sem.nombre}</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer" align="right">
				<button class="btn btn-primary" id="btn-ver-notas">Ver
					Notas</button>
			</div>
		</div>
		<div class="card shadow mt-5" hidden="true" id="detalle-notas">
			<div class="card-header" align="right">
				<button id="btn-descargar-notas" class="btn btn-success">Descargar</button>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table class="table table-hover mt-3">
						<thead>
							<tr>
								<th>RAMO</th>
								<th>NOTA 1</th>
								<th>NOTA 2</th>
								<th>NOTA 3</th>
								<th>NOTA 4</th>
								<th>NOTA 5</th>
								<th>NOTA 6</th>
								<th>NOTA 7</th>
								<th>NOTA 8</th>
								<th>PROMEDIO</th>
								<th>OPCIONES</th>
							</tr>
						</thead>
						<tbody id="tabla-notas">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<c:import url="footer.jsp"></c:import>
	<script
		src="${pageContext.request.contextPath}/static/js/jquery-3.4.1.min.js"></script>
	<script language="javascript" type="text/javascript"
		src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.10.0/jquery.validate.min.js"></script>

	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script
		src="${pageContext.request.contextPath}/static/js/bootstrap.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/static/app_plugin/js/informe-notas.js"></script>
</body>
</html>