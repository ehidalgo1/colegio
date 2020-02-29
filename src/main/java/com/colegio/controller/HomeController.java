package com.colegio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.NotaDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Profesor;
import com.colegio.service.CalculoService;

@Controller
public class HomeController {

	@Autowired
	private AlumnoDAO alumDAO;
	
	@Autowired
	private NotaDAO notaDAO;
	
	@Autowired
	private CalculoService calculoSrvc;
	
	
	@GetMapping({"/","/home"})
	public String goHome(HttpSession session, Model model) {
		String pagina = "";
		Profesor profe = null;

		try {
			
			profe = (Profesor) session.getAttribute("usuario");
			
			if (profe!=null) {
				
			

			model.addAttribute("profesor", profe);
			
			pagina = "home";
			
			}else {
				
				pagina = "redirect:login";
			}

		} catch (Exception e) {
			
			e.printStackTrace();
			pagina = "redirect:login";
			
		}

		return pagina;
	}
	
	@ResponseBody
	@GetMapping("/obtener-alumnos-por-curso")
	public List<Alumno> obtenerAlumnosPorCurso(HttpSession session, Model model){
		
		List<Alumno> listaAlumnosPorCurso = null;
		Profesor profesorSession = null;
		List<Nota> listaNotasPorCurso = null;
		
		try {
			
			profesorSession = (Profesor) session.getAttribute("usuario");
			
			if (profesorSession!=null) {
				
				listaAlumnosPorCurso = alumDAO.crud().buscarTodosPorIdCurso(profesorSession.getCurso().getIdCurso());
				
				
				
				listaNotasPorCurso = notaDAO.crud().buscarNotasPorCurso(profesorSession.getCurso().getIdCurso());
				
				if (listaNotasPorCurso!=null) {
					
					double total = 0;
					double promedio = 0;
					double promedioFinal = 0;
					
					for (Nota nota : listaNotasPorCurso) {
						
						total = total + nota.getNota1() + nota.getNota2() + nota.getNota3() + nota.getNota4() + nota.getNota5() + nota.getNota6() + nota.getNota6() + nota.getNota7() + nota.getNota8();
						
					}
					
					promedio = total / listaNotasPorCurso.size();
					
					promedioFinal = calculoSrvc.Redondear(promedio, 1);
					
					System.out.println("promedio curso:");
					System.out.println(promedioFinal);
					
					model.addAttribute("promedioCurso",promedioFinal);
					
				}
				
				
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			listaAlumnosPorCurso = new ArrayList<Alumno>();
		}
		
		
		return listaAlumnosPorCurso;
	}
	
	
	
	
}
