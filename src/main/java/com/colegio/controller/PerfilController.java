package com.colegio.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.colegio.entity.Profesor;

@Controller
public class PerfilController {

	
	
	@GetMapping("/mi-perfil")
	public String goMiPerfil(HttpSession session, Model model) {
		
		Profesor profe = null;
		String pagina = "";
		
		try {
			
			profe = (Profesor) session.getAttribute("usuario");
			
			
			if (profe!=null) {
				
				model.addAttribute("profesor", profe);
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
