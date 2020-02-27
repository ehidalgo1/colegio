<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Contexto para URL -->
	<c:set var="contextPath" value="${pageContext.request.contextPath}" />
	<!-- End Contexto -->
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html" charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
    <title>Login</title>
    <link href="static/css/bootstrap.min.css" rel="stylesheet" />
    <link href="static/app_plugin/css/estilo.css" rel="stylesheet" />
  </head>
  <body>
    <div class="contenedor-login">
      <div class="card shadow">
        <div class="card-body mt-0">
        <div class="container p-0 m-0" align="center">
        <img alt="" src="static/imagenes/logo_colegio_login.png">
        </div>
          <h4 class="card-title mb-3 mt-2 text-center">Iniciar Sesión</h4>
          <div class="form">
            <form action="/home" method="post" class="form-login">
              <div class="row">
                <div class="form-group col-md-12">
                  <input
                    type="email"
                    name="usuario"
                    id="usuario"
                    class="form-control"
                    placeholder="Usuario"
                  />
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="ContraseÃ±a"
                  />
                </div>
                <div class="form-group col-md-12">
                  <input
                    type="submit"
                    name="iniciar-sesion"
                    id="iniciar-sesion"
                    class="btn btn-success btn-block btn-lg"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <script src="static/js/jquery-3.4.1.min.js"></script>
    <script
    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"
  ></script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/app_plugin/js/login.js"></script>
  </body>
</html>
