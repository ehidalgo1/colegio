package com.colegio.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.colegio.DAO.ProfesorDAO;
import com.colegio.entity.Profesor;

@Controller
public class LoginController {
	
	
	@Autowired
	private ProfesorDAO profeDAO;
	
	@GetMapping("/login")
	public String goLogin() {
		
		String pagina = ""; 
		
		try {
			
			pagina = "login";
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			 pagina = "login";
			
		}
		
		return pagina;
		
	}
	
	@ResponseBody
	@PostMapping("/iniciar-sesion")
	public Integer iniciarSesion(@RequestParam("usuario")String usuario, @RequestParam("password") String password ,HttpSession session, Model model, RedirectAttributes redirectAtr) {
		
		int respuestaServidor = 0;
		Profesor profesorFind = null;
		
		try {
			
			profesorFind = profeDAO.crud().findByUsuarioAndPassword(usuario, password);
			
			if (profesorFind!=null) {
				
				session.setAttribute("usuario", profesorFind);
				
				respuestaServidor = 200;
				
				
			}else {
				
				String mensaje = "usuario y/o contraseña incorrecta";
				
				redirectAtr.addFlashAttribute("mensaje", mensaje);
				
				respuestaServidor = 100;
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
			
		}
		
		return respuestaServidor;
		
	}
	
	
	@GetMapping("/log-out")
	public String logOut(HttpSession session) {
		String pagina = "";
		
		try {
			
			session.invalidate();
			
			pagina = "redirect:login";
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		return pagina;
	}
	
	
	

}
