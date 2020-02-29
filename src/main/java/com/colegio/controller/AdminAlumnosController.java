package com.colegio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.CursoDAO;
import com.colegio.DAO.FuncionesDAO;
import com.colegio.DAO.NotaDAO;
import com.colegio.DAO.SemestreDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Curso;
import com.colegio.entity.Nota;
import com.colegio.entity.Profesor;
import com.colegio.entity.Ramo;
import com.colegio.entity.Semestre;

import java.util.List;

import javax.servlet.http.HttpSession;

import java.util.ArrayList;

@Controller
public class AdminAlumnosController {

	@Autowired
	private CursoDAO cursoDAO;

	@Autowired
	private AlumnoDAO alumnoDAO;

	@Autowired
	private FuncionesDAO funDAO;

	@Autowired
	private NotaDAO notaDAO;

	@Autowired
	private SemestreDAO semDAO;

	@GetMapping("/administracion-alumnos")
	public String goAdminAlumnos(HttpSession session, Model model) {
		String pagina = "";
		Profesor profe = null;

		try {

			Profesor profeSession = (Profesor) session.getAttribute("usuario");

			if (profeSession != null) {

				profe = (Profesor) session.getAttribute("usuario");

				model.addAttribute("profesor", profe);
				
				if (profe.getRol().getNombreRol().equals("ADMINISTRADOR")) {
					
					pagina = "administracion-alumnos";
					
				}else {
					
					pagina = "redirect:home";
					
				}

				

			} else {
				pagina = "redirect:login";
			}

		} catch (Exception e) {

			e.printStackTrace();
			pagina = "redirect:login";
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
	public Integer guardarAlumno(@RequestParam("nombre") String nombre, @RequestParam("apellido_p") String apellidoP,
			@RequestParam("apellido_m") String apellidoM, @RequestParam("token_curso") String tokenCurso,
			@RequestParam("run") String run) {

		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		Curso cursoFind = null;
		Alumno alumno = null;
		Nota nota = null;
		List<Nota> listaNotas = null;

		try {

			alumnoFind = alumnoDAO.crud().buscarPorNombreAndApellido(nombre, apellidoP);

			if (alumnoFind == null) {

				cursoFind = cursoDAO.crud().findByToken(tokenCurso);

				if (cursoFind != null) {

					Long idAlumno = (long) 0;

					alumno = new Alumno(idAlumno, apellidoM.toUpperCase(), apellidoP.toUpperCase(),
							nombre.toUpperCase(), funDAO.funcionToken(), run, cursoFind);

					alumnoDAO.crud().save(alumno);

					alumnoFind = alumnoDAO.crud().buscarPorNombreAndApellido(nombre, apellidoP);

					Semestre semestreUno = semDAO.crud().findBySemestre(1);
					Semestre semestreDos = semDAO.crud().findBySemestre(2);

					Long idNota = (long) 1;

					for (Ramo ramo : cursoFind.getRamos()) {

						if ((notaDAO.crud().count() > 0) || notaDAO.crud().count() != 0) {
							idNota = notaDAO.crud().count() + 1;
						}

						nota = new Nota(idNota, 0, 0, 0, 0, 0, 0, 0, 0, semestreUno, ramo, alumnoFind);

						notaDAO.crud().save(nota);

					}

					for (Ramo ramo : cursoFind.getRamos()) {

						if ((notaDAO.crud().count() > 0) || notaDAO.crud().count() != 0) {
							idNota = notaDAO.crud().count() + 1;
						}

						nota = new Nota(idNota, 0, 0, 0, 0, 0, 0, 0, 0, semestreDos, ramo, alumnoFind);

						notaDAO.crud().save(nota);

					}

					// exito
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
	
	
	@ResponseBody
	@GetMapping("obtener-datos-alumno/{token}")
	public Alumno obtenerDatosAlumno(@PathVariable String token) {
		Alumno alumnoFind = null;
		
		try {
			
			alumnoFind = alumnoDAO.crud().findByToken(token);
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			alumnoFind = new Alumno();
		}
		
		
		return alumnoFind;
	}
	
	
	@ResponseBody
	@PostMapping("guardar-cambios-alumno/{token}")
	public Integer guardarCambiosAlumno(@PathVariable String token, @RequestBody Alumno alum) {
		
		int respuestaServidor =  0;
		Alumno alumnoFind = null;
		Curso cursoFind = null;
		
		try {
			
			alumnoFind = alumnoDAO.crud().findByToken(token);
			
			if (alumnoFind!=null) {
				
				cursoFind = cursoDAO.crud().findByToken(alum.getCurso().getToken());
				
				if (cursoFind!=null) {
					
					alumnoFind.setRun(alum.getRun());
					alumnoFind.setNombre(alum.getNombre());
					alumnoFind.setApellidoP(alum.getApellidoP());
					alumnoFind.setApellidoM(alum.getApellidoM());
					alumnoFind.setCurso(cursoFind);
					
					alumnoDAO.crud().save(alumnoFind);
					
					respuestaServidor = 200;
					
					
				}
				
			}
			
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
		}
		
		
		return respuestaServidor;
		
	}
	
	@ResponseBody
	@PostMapping("/eliminar-alumno/{token}")
	public Integer eliminarAlumno(@PathVariable String token) {
		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		
		try {
			
			alumnoFind = alumnoDAO.crud().findByToken(token);
			
			if (alumnoFind!=null) {
				
				alumnoDAO.crud().delete(alumnoFind);
				
				respuestaServidor = 200;
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
		}
		
		return respuestaServidor;
	}
	
	
	
	
	
	
	
	

}
