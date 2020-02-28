package com.colegio.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Profesor;

@Controller
public class PerfilController {

	
	@Autowired
	AlumnoDAO alumDAO;
	
	
	@GetMapping("/mi-perfil")
	public String goMiPerfil(HttpSession session, Model model) {
		
		Profesor profe = null;
		String pagina = "";
		List<Alumno> listaAlumnos = null;
		
		try {
			
			profe = (Profesor) session.getAttribute("usuario");
			
			
			if (profe!=null) {
				
				listaAlumnos = alumDAO.crud().buscarTodosPorIdCurso(profe.getCurso().getIdCurso());
				
				model.addAttribute("profesor", profe);
				model.addAttribute("listaAlumnos", listaAlumnos);
				pagina = "perfil";
				
				
			}else {
				
				pagina = "redirect:login";
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			pagina = "redirect:login";
		}
		
		return pagina;
	}
	
}
