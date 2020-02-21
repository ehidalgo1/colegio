package com.colegio.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.FuncionesDAO;
import com.colegio.DAO.ProfesorDAO;
import com.colegio.entity.Profesor;

@Controller
public class AdminProfesor {
	
	
	@Autowired
	private ProfesorDAO profDAO;
	
	@Autowired
	private FuncionesDAO fuDAO;

	@GetMapping("/administracion-profesores")
	public String goAdminProfesores() {
		return "administracion-profesores";
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
	@PostMapping("/guardar-profesor")
	public Integer guardarProfesor(@RequestBody Profesor profe) {
		
		int respuestaServidor = 0;
		Profesor profesorFind = null;
		
		
		try {
			
			profesorFind = profDAO.crud().findByNombreAndApellido(profe.getNombre(), profe.getApellido());
			
			if (profesorFind==null) {
				
				Long idProfesor = (long) 0;
				
				Profesor nuevoProfesor = new Profesor(idProfesor, profe.getApellido(), profe.getEspecialidad(), profe.getNombre(), "colegio123", fuDAO.funcionToken(), profe.getUsuario(), null);
				
				profDAO.crud().save(nuevoProfesor);
				
				respuestaServidor = 200;
				
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
