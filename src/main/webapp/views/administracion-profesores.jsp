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
    <link href="static/app_plugin/css/estilo.css" rel="stylesheet" />
</head>

<body>
<c:import url="menu.jsp"></c:import>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h4>Administración profesores</h4>
            </div>
            <div class="card-body">
                <button class="btn btn-primary" id="btn-agregar-profesor">Agregar profesor</button>
                <table class="table table-hover mt-4">
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>APELLIDO</th>
                            <th>ESPECIALIDAD</th>
                            <th>USUARIO</th>
                            <th>CONTRASEÑ‘A</th>
                            <th>CURSO</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-profesor">

                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!--modal agregar alumno-->
    <div
      id="modal-agregar-profesor"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modal-agregar-profesor"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4>Agregar profesor</h4>
          </div>
          <form action="" method="post" id="form-agregar-profesor" class="form-agregar-profesor">
          <div class="modal-body">
              <div class="form p-4">
                      <div class="form-group row">
                          <label for="nombre" class="col-md-3">Nombre</label>
                          <div class="col-md-7">
                            <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Primer nombre">
                          </div>
                      </div>
                      <div class="form-group row">
                        <label for="apellido" class="col-md-3">Apellido</label>
                        <div class="col-md-7">
                          <input type="text" name="apellido" id="apellido" class="form-control" placeholder="Primer apellido">
                        </div>
                    </div>
                    <div class="form-group row">
                      <label for="usuario" class="col-md-3">Usuario</label>
                      <div class="col-md-7">
                        <input type="email" name="usuario" id="usuario" class="form-control" placeholder="usuario@correo.cl">
                      </div>
                  </div>
                    <div class="form-group row">
                        <label for="especialidad" class="col-md-3">Especialidad</label>
                        <div class="col-md-7">
                            <select name="especialidad" id="especialidad" class="form-control">
                                
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
                    
              </div>
          </div>
          <div class="modal-footer text-rigth">
              <button class="btn btn-success" id="btn-form-agregar-alumno">Agregar</button>
            </form>
          </div>
        </div>
      </div>
      <!--end modal agregar-->
    </div>
    <script src="static/js/jquery-3.4.1.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/app_plugin/js/administracion-profesores.js"></script>
</body>

</html>