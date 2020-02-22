package com.colegio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.CursoDAO;
import com.colegio.DAO.FuncionesDAO;
import com.colegio.DAO.ProfesorDAO;
import com.colegio.DAO.RamoDAO;
import com.colegio.entity.Curso;
import com.colegio.entity.Profesor;
import com.colegio.entity.Ramo;

@Controller
public class AdminProfesoresController {

	
	@Autowired
	private ProfesorDAO profDAO;
	
	@Autowired
	private FuncionesDAO fuDAO;
	
	@Autowired
	private RamoDAO ramoDAO;
	
	@Autowired
	private CursoDAO cursoDAO;

	@GetMapping("/administracion-profesores")
	public String goAdminProfesores(HttpSession session, Model model) {
		
		String pagina = "";
		Profesor profe = null;
		
		try {
			
			Profesor profeSession = (Profesor) session.getAttribute("usuario");
			
			if (profeSession != null) {
				
				profe = (Profesor) session.getAttribute("usuario");

				model.addAttribute("profesor", profe);
				
				pagina = "administracion-profesores";
				
				
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
	@GetMapping("/obtener-profesores")
	public List<Profesor> obtenerListaProfesores(){
		
		List<Profesor> listaProfesores = null;
		
		try {
			
			listaProfesores = (List<Profesor>) profDAO.crud().findAll();
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			listaProfesores = new ArrayList<Profesor>();
		}
		
		return listaProfesores;
	}
	
	@ResponseBody
	@GetMapping("/obtener-lista-ramos")
	public List<Ramo> obtenerListaRamos(){
		
		List<Ramo> listaRamos = null;
		
		try {
			
			listaRamos = (List<Ramo>) ramoDAO.crud().findAll();
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			listaRamos = new ArrayList<Ramo>();
		}
		
		return listaRamos;
		
		
	}
	
	@ResponseBody
	@PostMapping("/guardar-profesor")
	public Integer guardarProfesor(@RequestBody Profesor profe) {
		
		int respuestaServidor = 0;
		Profesor profesorFind = null;
		Profesor nuevoProfe = null;
		Curso cursoFind = null;
		
		try {
			
			profesorFind = profDAO.crud().findByNombreAndApellido(profe.getNombre(), profe.getApellido());
			
			if (profesorFind==null) {
				
				Long idProfesor = (long) 0;
				
				cursoFind = cursoDAO.crud().findByToken(profe.getCurso().getToken());
				
				if (cursoFind != null) {
					
					nuevoProfe = new Profesor(idProfesor, profe.getApellido(), profe.getEspecialidad(), profe.getNombre(), "colegio123", fuDAO.funcionToken(), profe.getUsuario(), cursoFind, null);
					
					profDAO.crud().save(nuevoProfe);
					
					respuestaServidor = 200;
					
				}

				
			}else {
				
				//profesor existe
				respuestaServidor = 100;
			}
			
			
		} catch (Exception e) {
			e.printStackTrace();
			respuestaServidor = 500;
		}
		
		return respuestaServidor;
	}
	
}
