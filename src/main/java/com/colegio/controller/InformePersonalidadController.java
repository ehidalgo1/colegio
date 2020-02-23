package com.colegio.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.PersonalidadDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Personalidad;

@Controller
public class InformePersonalidadController {
	
	@Autowired
	private PersonalidadDAO personDAO;
	
	@Autowired
	private AlumnoDAO alumDAO;

	@GetMapping("/informe-personalidad/{token}")
	public String goInformePersonalidad(@PathVariable String token,HttpSession session, Model model) {
		
		String pagina = "informe-personalidad";
		Alumno alumnoFind = null;
		Personalidad personalidadPorAlumno = null;
		
		try {
			
			
			alumnoFind = alumDAO.crud().findByToken(token);
			
			
			if(alumnoFind!=null) {
				
				personalidadPorAlumno = personDAO.crud().findByAlumno(alumnoFind);
				
				if(personalidadPorAlumno!=null) {
					
					model.addAttribute("personalidad",personalidadPorAlumno);
					
				}
				
			}else {
				
				pagina = "redirect:home";
				
			}
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			personalidadPorAlumno = new Personalidad();
			
			pagina = "redirect:home";
		}
		
		return pagina;
		
	}

}
