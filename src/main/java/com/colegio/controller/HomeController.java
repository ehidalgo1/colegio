package com.colegio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Profesor;

@Controller
public class HomeController {

	@Autowired
	private AlumnoDAO alumDAO;
	
	
	@GetMapping({"/","/home"})
	public String goHome() {
		String pagina = "";

		try {

			pagina = "home";

		} catch (Exception e) {
			
			e.printStackTrace();
			pagina = "login";
			
		}

		return pagina;
	}
	
	@GetMapping("/obtener-alumnos-por-curso")
	public List<Alumno> obtenerAlumnosPorCurso(HttpSession session){
		
		List<Alumno> listaAlumnosPorCurso = null;
		Profesor profesorSession = null;
		
		try {
			
			profesorSession = (Profesor) session.getAttribute("usuario");
			
			if (profesorSession!=null) {
				
				listaAlumnosPorCurso = alumDAO.crud().findAllByCurso(profesorSession.getCurso());
				
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			listaAlumnosPorCurso = new ArrayList<Alumno>();
		}
		
		
		return listaAlumnosPorCurso;
	}
	
	
	
	
}
