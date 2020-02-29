
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Vertical navbar -->
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<div class="vertical-nav bg-white shadow" id="sidebar">
  <div class="py-4 px-3 mb-4 bg-light">
    <div class="media d-flex align-items-center"><img src="${pageContext.request.contextPath}/static/imagenes/avatar_colegio.PNG" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm">
      <div class="media-body">
        <h4 class="m-0">${profesor.nombre} ${profesor.apellido}</h4>
        <p class="font-weight-light text-muted mb-0">Profesor</p>
      </div>
    </div>
  </div>

  <p class="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">Administración</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="/home" class="nav-link text-dark font-italic bg-light">
                <i class="fa fa-th-large mr-3 text-primary fa-fw"></i>
                Home
            </a>
    </li>
    
    
    <c:if test="${profesor.rol.idRol==2}">
    
    <li class="nav-item">
      <a href="/administracion-alumnos" class="nav-link text-dark font-italic">
                <i class="fa fa-address-card mr-3 text-primary fa-fw"></i>
                Administración alumnos
            </a>
    </li>
   
    <li class="nav-item">
      <a href="/administracion-profesores" class="nav-link text-dark font-italic">
                <i class="fa fa-cubes mr-3 text-primary fa-fw"></i>
                Administración profesores
            </a>
    </li>
    
     </c:if>
  </ul>

  <p class="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">Perfil</p>

  <ul class="nav flex-column bg-white mb-0">
    <li class="nav-item">
      <a href="/mi-perfil" class="nav-link text-dark font-italic">
                <i class="fa fa-area-chart mr-3 text-primary fa-fw"></i>
                Mi perfil
            </a>
    </li>
    <li class="nav-item">
      <a href="/log-out" class="nav-link text-dark font-italic">
                <i class="fa fa-bar-chart mr-3 text-primary fa-fw"></i>
                Cerrar sesión
            </a>
    </li>
  </ul>
</div>
<!-- End vertical navbar -->


<!-- Page content holder -->
<div class="page-content p-5" id="content">
  <!-- Toggle button -->
  <button id="sidebarCollapse" type="button" class="btn btn-light bg-white rounded-pill shadow-sm px-4"><i class="fa fa-bars mr-2"></i><small class="text-uppercase font-weight-bold">Menu</small></button>
</div>
<!-- End demo content -->

<div class="page-content p-3" id="content">

