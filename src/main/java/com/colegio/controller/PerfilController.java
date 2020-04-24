package com.colegio.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.ProfesorDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Profesor;

@Controller
public class PerfilController {

	
	@Autowired
	private AlumnoDAO alumDAO;
	
	@Autowired
	private ProfesorDAO profeDAO;
	
	
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
	
	@ResponseBody
	@PostMapping("/cambiar-password-profesor/{token}")
	public Integer cambiarPasswordProfesor(@PathVariable String token, @RequestParam("password") String password) {
		
		int respuestaServidor = 0;
		
		Profesor profeFind = null;
		
		try {
			
			profeFind = profeDAO.crud().findByToken(token);
			
			if (profeFind!=null) {
				
				profeFind.setPassword(password);
				
				profeDAO.crud().save(profeFind);
				
				respuestaServidor = 200;
				
			}else {
				
				respuestaServidor = 100;
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
		}
		
		return respuestaServidor;
		
	}
	
	
}
