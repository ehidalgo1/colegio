<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Contexto para URL -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!-- End Contexto -->
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
<title>home</title>
<link href="static/css/bootstrap.min.css" rel="stylesheet" />
<link href="static/app_plugin/css/estilo.css" rel="stylesheet" />
<title>Inicio</title>
</head>
<body>
	<c:import url="menu.jsp"></c:import>
	<div class="container">
		<div class="card shadow">
			<div class="card-header">
				<h4>Mi perfil</h4>
			</div>
			<div class="card-body p-5">
				<div class=row>
					<div class=col-md-6>
						<div class="row">
							<label class="col-md-12">Nombre: ${profesor.nombre}
								${profesor.apellido}</label> <label class="col-md-12">Curso:
								${profesor.curso.numeroCurso}</label> <label class="col-md-12">Usuario:
								${profesor.usuario}</label>
						</div>
					</div>
					<div class=col-md-6>
						<div class="row">
							<label class="col-md-12">Ramo: ${profesor.especialidad}</label> <label
								class="col-md-12">Total alumnos: ${listaAlumnos.size()}</label>
						</div>
					</div>
				</div>
			</div>
			<div class="card-footer text-right">
				<button id="btn-cambiar-password" class="btn btn-secondary">Cambiar
					contraseña</button>
			</div>
		</div>
	</div>

	<!-- modal cambiar password -->
	<div id="modal-cambiar-password" class="modal fade" tabindex="-1"
		role="dialog" aria-labelledby="modal-editar-profesor"
		aria-hidden="true">
		<div class="modal-dialog modal-md modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h4>Cambiar contraseña</h4>
				</div>
				<form action="" method="post" id="form-cambiar-password">
					<div class="modal-body">
						<div class="form p-4">
							<div class="form-group row">
								<label for="new-password" class="col-md-3">Nueva
									contraseña</label>
								<div class="col-md-7">
									<input type="text" name="new-password" id="new-password"
										class="form-control" placeholder="Nueva contraseña">
								</div>
							</div>
							<div class="form-group row">
								<label for="confirm-password" class="col-md-3">Confirme
									contraseña</label>
								<div class="col-md-7">
									<input type="text" name="confirm-password"
										id="confirm-password" class="form-control"
										placeholder="Confirme nueva contraseña">
								</div>
							</div>
							<div class="form-group">
								<input id="token-profesor" type="text" value="${profesor.token}" hidden="true">
							</div>
						</div>
					</div>
					<div class="modal-footer text-rigth">
						<input type="submit"  class="btn btn-success" value="Guardar cambios">
					</div>
				</form>
			</div>
		</div>
	</div>
	<!--end modal cambiar password-->

	<c:import url="footer.jsp"></c:import>
	<script src="static/js/jquery-3.4.1.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/app_plugin/js/perfil.js"></script>
</body>
</html>