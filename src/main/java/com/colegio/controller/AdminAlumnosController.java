package com.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.CursoDAO;
import com.colegio.DAO.FuncionesDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Curso;

import java.util.List;
import java.util.ArrayList;

@Controller
public class AdminAlumnosController {

	@Autowired
	private CursoDAO cursoDAO;

	@Autowired
	private AlumnoDAO alumnoDAO;

	@Autowired
	private FuncionesDAO funDAO;

	@GetMapping("/administracion-alumnos")
	public String goAdminAlumnos() {
		String pagina = "";

		try {

			pagina = "administracion-alumnos";

		} catch (Exception e) {

			e.printStackTrace();
			pagina = "login";
		}

		return pagina;
	}

	@ResponseBody
	@GetMapping("/obtener-cursos")
	public List<Curso> obtenerListaCursos() {
		List<Curso> listaCursos = null;

		try {

			listaCursos = (List<Curso>) cursoDAO.crud().findAll();

		} catch (Exception e) {
			e.printStackTrace();
			listaCursos = new ArrayList<Curso>();
		}

		return listaCursos;
	}

	@ResponseBody
	@GetMapping("/obtener-alumnos")
	public List<Alumno> obtenerListaAlumnos() {
		List<Alumno> listaAlumnos = null;

		try {

			listaAlumnos = (List<Alumno>) alumnoDAO.crud().findAll();

		} catch (Exception e) {
			e.printStackTrace();
			listaAlumnos = new ArrayList<Alumno>();
		}

		return listaAlumnos;
	}

	@ResponseBody
	@PostMapping("/guardar-alumno")
	public Integer guardarAlumno(@RequestParam("nombre") String nombre,
			@RequestParam("apellido_p") String apellidoP, @RequestParam("apellido_m") String apellidoM,
			@RequestParam("token_curso") String tokenCurso) {

		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		Curso cursoFind = null;
		Alumno alumno = null;

		try {

			alumnoFind = alumnoDAO.crud().buscarPorNombreAndApellido(nombre, apellidoP);
			
			if (alumnoFind == null) {
				
				cursoFind = cursoDAO.crud().findByToken(tokenCurso);
				
				if (cursoFind != null) {

					Long idAlumno = (long) 0;

					alumno = new Alumno(idAlumno, apellidoM, apellidoP, nombre, funDAO.funcionToken(), cursoFind, null);

					alumnoDAO.crud().save(alumno);

					respuestaServidor = 200;

				}
				
			} else {
				
				// el alumno existe
				respuestaServidor = 100;

			}

		} catch (Exception e) {
			e.printStackTrace();

			respuestaServidor = 500;
		}

		return respuestaServidor;

	}

}
