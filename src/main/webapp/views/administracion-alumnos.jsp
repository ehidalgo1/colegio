<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Contexto para URL -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!-- End Contexto -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>administración alumnos</title>
<link href="static/css/bootstrap.min.css" rel="stylesheet" />
<link href="static/app_plugin/css/estilo.css" rel="stylesheet" />
</head>
<body>
	<c:import url="menu.jsp"></c:import>
	<div class="preloader" hidden="false"></div>
	<div class="container">
		<div class="card">
			<div class="card-header">
				<h4>Administración alumnos</h4>
			</div>
			<div class="card-body">
				<button class="btn btn-primary" id="btn-agregar-alumno">
					Agregar alumno</button>
				<table class="table table-hover mt-4">
					<thead>
						<tr>
							<th>NOMBRE</th>
							<th>APELLIDO</th>
							<th>CURSO</th>
						</tr>
					</thead>
					<tbody id="tabla-alumnos">
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!--modal agregar alumno-->
	<div id="modal-agregar-alumno" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="modal-agregar-alumno"
		aria-hidden="true">
		<div class="modal-dialog modal-md modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Agregar alumno</h4>
				</div>
				<form action="" method="post" id="form-agregar-alumno"
					class="form-agregar-alumno">
					<div class="modal-body">
						<div class="form p-4">
							<div class="form-group row">
								<label for="run" class="col-md-3">RUN</label>
								<div class="col-md-7">
									<input type="text" name="run" id="run"
										class="form-control" placeholder="12345678-0">
								</div>
							</div>
							<div class="form-group row">
								<label for="p_nombre" class="col-md-3">Nombre</label>
								<div class="col-md-7">
									<input type="text" name="nombre" id="nombre"
										class="form-control" placeholder="Primer nombre">
								</div>
							</div>
							<div class="form-group row">
								<label for="apellido_p" class="col-md-3">Apellido P</label>
								<div class="col-md-7">
									<input type="text" name="apellido_p" id="apellido_p"
										class="form-control" placeholder="Primer apellido">
								</div>
							</div>
							<div class="form-group row">
								<label for="apellido_m" class="col-md-3">Apellido M</label>
								<div class="col-md-7">
									<input type="text" name="apellido_m" id="apellido_m"
										class="form-control" placeholder="Segundo apellido">
								</div>
							</div>
							<div class="form-group row">
								<label for="curso" class="col-md-3">Curso</label>
								<div class="col-md-7">
									<select name="lista-curso" id="lista-curso"
										class="form-control">

									</select>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer text-rigth">
						<button class="btn btn-success" id="btn-form-agregar-alumno">Agregar</button>
					</div>
				</form>
			</div>
		</div>
		<!--end modal agregar-->
		
	</div>
	<c:import url="footer.jsp"></c:import>
	<script src="static/js/jquery-3.4.1.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/app_plugin/js/administracion-alumnos.js"></script>
</body>
</html>
