package com.colegio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.NotaDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Profesor;
import com.colegio.entity.Ramo;

@Controller
public class InformeNotasController {

	@Autowired
	private AlumnoDAO alumDAO;
	
	@Autowired
	private NotaDAO notaDAO;
	
	@GetMapping("/informe-notas/{token}")
	public String goInformeNotas(@PathVariable String token,Model model, HttpSession session) {
		
		Profesor profe = null;
		String pagina = "";
		Alumno alumnoFind = null;
		List<Nota> listaNotasPorAlumno = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByToken(token);
			
			if (alumnoFind!=null) {
				
				listaNotasPorAlumno = notaDAO.crud().findByAlumno(alumnoFind);
				
				model.addAttribute("alumno", alumnoFind);
				model.addAttribute("listanotas",listaNotasPorAlumno);
				
				profe = (Profesor) session.getAttribute("usuario");

				model.addAttribute("profesor", profe);
				
				
				pagina = "informe-notas";
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			pagina = "home";
		}
		
		return pagina;
	}
	
	
	
}
