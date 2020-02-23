<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!-- Contexto para URL -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<!-- End Contexto -->
<!DOCTYPE html>
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
	<div class="container">
		<div class="card">
			<div class="card-header">
				<h4>Notas Alumno</h4>
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-md-12">
					<h6>Alumno: ${alumno.nombre} ${alumno.apellidoP} ${alumno.apellidoM}</h6>
					<h6>Curso: ${alumno.curso.numeroCurso}</h6>
					<input id="token-alumno" type="text" value="${alumno.token}" hidden="true" readonly="readonly">
						<button class="btn btn-primary mt-3">Agregar nota</button>
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
									<th>PROMEDIO FINAL</th>
									<th>OPCIONES</th>
								</tr>
							</thead>
							<tbody id="tabla-notas">
								<c:set var="total" value="${0}" />
								<c:forEach items="${listanotas}" var="item">
									<tr>
										<td>${item.ramo.nombre}</td>
										<td>${item.nota1}</td>
										<td>${item.nota2}</td>
										<td>${item.nota3}</td>
										<td>${item.nota4}</td>
										<td>${item.nota5}</td>
										<td>${item.nota6}</td>
										<td>${item.nota7}</td>
										<td>${item.nota8}</td>
										<c:set var="total"
											value="${ (total + item.nota1 + item.nota2 + item.nota3 + item.nota4 + item.nota5 + item.nota6 + item.nota7 + item.nota8 ) /8 }" />
										<td><fmt:formatNumber value="${total}" maxFractionDigits="1" /></td>
										<td><button id="btn-editar-nota" class="btn btn-secondary btn-sm rounded-circle">+</button><button hidden="true"  id="btn-guardar-notas" class="btn btn-success btn-sm rounded-circle">Ok</button></td>
									</tr>
								</c:forEach>
							</tbody>
						</table>
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
		src="${pageContext.request.contextPath}/static/app_plugin/js/informe-notas.js"></script>
</body>
</html>