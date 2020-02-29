<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Contexto para URL -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!-- End Contexto -->
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Administración profesores</title>
<link href="static/css/bootstrap.min.css" rel="stylesheet" />
<link href="static\plugins\sweetalert\css\sweetalert.css"
	rel="stylesheet" />
<link href="static/app_plugin/css/estilo.css" rel="stylesheet" />
</head>

<body>
	<c:import url="menu.jsp"></c:import>
	<div class="container">
		<div class="card shadow">
			<div class="card-header">
				<h4>Administración profesores</h4>
			</div>
			<div class="card-body">
				<button class="btn btn-primary" id="btn-agregar-profesor">Agregar
					profesor</button>
				<table class="table table-hover mt-4">
					<thead>
						<tr>
							<th>NOMBRE</th>
							<th>APELLIDO</th>
							<th>ESPECIALIDAD</th>
							<th>USUARIO</th>
							<th>CONTRASEÑ‘A</th>
							<th>CURSO</th>
							<th>OPCIONES</th>
						</tr>
					</thead>
					<tbody id="tabla-profesor">

					</tbody>
				</table>
			</div>
		</div>
	</div>
	<!--modal agregar profesor-->
	<div id="modal-agregar-profesor" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="modal-agregar-profesor"
		aria-hidden="true">
		<div class="modal-dialog modal-md modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Agregar profesor</h4>
				</div>
				<form action="" method="post" id="form-agregar-profesor"
					class="form-agregar-profesor">
					<div class="modal-body">
						<div class="form p-4">
							<div class="form-group row">
								<label for="run" class="col-md-3">RUN</label>
								<div class="col-md-7">
									<input type="text" name="run" id="run" class="form-control"
										placeholder="12345678-0">
								</div>
							</div>
							<div class="form-group row">
								<label for="nombre" class="col-md-3">Nombre</label>
								<div class="col-md-7">
									<input type="text" name="nombre" id="nombre"
										class="form-control" placeholder="Primer nombre">
								</div>
							</div>
							<div class="form-group row">
								<label for="apellido" class="col-md-3">Apellido</label>
								<div class="col-md-7">
									<input type="text" name="apellido" id="apellido"
										class="form-control" placeholder="Primer apellido">
								</div>
							</div>
							<div class="form-group row">
								<label for="usuario" class="col-md-3">Usuario</label>
								<div class="col-md-7">
									<input type="email" name="usuario" id="usuario"
										class="form-control" placeholder="usuario@correo.cl">
								</div>
							</div>
							<div class="form-group row">
								<label for="especialidad" class="col-md-3">Especialidad</label>
								<div class="col-md-7">
									<select name="especialidad" id="especialidad"
										class="form-control">

									</select>
								</div>
							</div>
							<div class="form-group row">
								<label for="curso" class="col-md-3">Curso</label>
								<div class="col-md-7">
									<select name="curso" id="curso" class="form-control">

									</select>
								</div>
							</div>
							<div class="form-group row">
								<label for="rol" class="col-md-3">Rol</label>
								<div class="col-md-7">
									<select id="rol" name="rol" class="form-control">
										<option value="PROFESOR">Profesor</option>
										<option value="ADMINISTRADOR">Administrador</option>
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
	</div>
	<!--end modal agregar-->
	<!-- modal editar -->
	<div id="modal-editar-profesor" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="modal-editar-profesor"
		aria-hidden="true">
		<div class="modal-dialog modal-md modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Editar profesor</h4>
				</div>
				<div class="modal-body">
					<div class="form p-4">
						<div class="form-group row">
							<label for="run-editar" class="col-md-3">RUN</label>
							<div class="col-md-7">
								<input type="text" name="run-editar" id="run-editar"
									class="form-control" placeholder="12345678-0">
							</div>
						</div>
						<div class="form-group row">
							<label for="nombre-editar" class="col-md-3">Nombre</label>
							<div class="col-md-7">
								<input type="text" name="nombre-editar" id="nombre-editar"
									class="form-control" placeholder="Primer nombre">
							</div>
						</div>
						<div class="form-group row">
							<label for="apellido-editar" class="col-md-3">Apellido</label>
							<div class="col-md-7">
								<input type="text" name="apellido-editar" id="apellido-editar"
									class="form-control" placeholder="Primer apellido">
							</div>
						</div>
						<div class="form-group row">
							<label for="usuario-editar" class="col-md-3">Usuario</label>
							<div class="col-md-7">
								<input type="email" name="usuario-editar" id="usuario-editar"
									class="form-control" placeholder="usuario@correo.cl">
							</div>
						</div>
						<div class="form-group row">
							<label for="especialidad-editar" class="col-md-3">Especialidad</label>
							<div class="col-md-7">
								<select name="especialidad-editar" id="especialidad-editar"
									class="form-control">

								</select>
							</div>
						</div>
						<div class="form-group row">
							<label for="curso-editar" class="col-md-3">Curso</label>
							<div class="col-md-7">
								<select name="curso-editar" id="curso-editar"
									class="form-control">

								</select>
							</div>
						</div>
						<div class="form-group row">
							<label for="rol-editar" class="col-md-3">Rol</label>
							<div class="col-md-7">
								<select id="rol-editar" name="rol-editar" class="form-control">
									<option value="PROFESOR">Profesor</option>
									<option value="ADMINISTRADOR">Administrador</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer text-rigth">
					<button class="btn btn-success" id="btn-form-editar-profesor">Guardar
						cambios</button>

				</div>
			</div>
		</div>
		<!--end modal editar-->
		<!--modal eliminar -->
		<div id="modal-eliminar" class="modal fade" tabindex="-1"
			role="dialog" aria-labelledby="modal-eliminar" aria-hidden="true">
			<div class="modal-dialog modal-md modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h4>Eliminar profesor</h4>
					</div>
					<div class="modal-body"></div>
					<div class="modal-footer text-rigth">
						<button class="btn btn-success" id="btn-form-editar-profesor">Guardar
							cambios</button>

					</div>
				</div>
			</div>
			<!--end modal eliminar-->
		</div>
	</div>
	<c:import url="footer.jsp"></c:import>
	<script src="static/js/jquery-3.4.1.min.js"></script>
	<script src="static/js/jquery.validate.min.js"></script>
	<script src="static\plugins\sweetalert\js\sweetalert.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/app_plugin/js/administracion-profesores.js"></script>
</body>

</html>