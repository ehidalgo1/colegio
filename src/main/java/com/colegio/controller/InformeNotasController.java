package com.colegio.controller;

import java.io.ByteArrayInputStream;
import java.io.Console;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.NotaDAO;
import com.colegio.DAO.RamoDAO;
import com.colegio.DAO.SemestreDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Profesor;
import com.colegio.entity.Ramo;
import com.colegio.entity.Semestre;

@Controller
public class InformeNotasController {

	@Autowired
	private AlumnoDAO alumDAO;
	
	@Autowired
	private NotaDAO notaDAO;
	
	@Autowired
	private RamoDAO ramoDAO;
	
	@Autowired
	private SemestreDAO semDAO;
	
	@GetMapping("/informe-notas/{token}")
	public String goInformeNotas(@PathVariable String token,Model model, HttpSession session) {
		
		Profesor profe = null;
		String pagina = "";
		Alumno alumnoFind = null;
		List<Nota> listaNotasPorAlumno = null;
		List<Semestre> listaSemestres = null;
		Semestre semestreFind = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByToken(token);
			
			if (alumnoFind!=null) {
				
				semestreFind = semDAO.crud().findBySemestre(1);
				
				listaNotasPorAlumno = notaDAO.crud().findByAlumnoAndSemestre(alumnoFind, semestreFind);
				
				listaSemestres = (List<Semestre>) semDAO.crud().findAll();
				
				model.addAttribute("listaSemestres",listaSemestres);
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
	
	@ResponseBody
	@GetMapping("/obtener-notas-alumno/{run}/{semestre}")
	public List<Nota> listaNotasAlumnoSemestre(@PathVariable String run, @PathVariable String semestre){
		
		List<Nota> listaNotas = null;
		Alumno alumnoFind = null;
		Semestre semestreFind = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByRun(run);
			
			if (alumnoFind!=null) {
				
				int numeroSemestre = Integer.parseInt(semestre);
				
				semestreFind = semDAO.crud().findBySemestre(numeroSemestre);
				
				if (semestreFind!=null) {
					
					listaNotas = notaDAO.crud().findByAlumnoAndSemestre(alumnoFind, semestreFind);
					
				}
				
			}
			
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			listaNotas = new ArrayList<Nota>();
		}
		
		return listaNotas;
		
	}
	
	@ResponseBody
	@PostMapping("/guardar-notas/{run}/{semestre}")
	public Integer guardarNotasAlumno(@PathVariable String run, @PathVariable Long semestre,@RequestBody List<String> listaNotas) {
		
		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		Nota notaFind = null;
		Ramo ramoFind = null;
		
		try {
			
			if (!listaNotas.isEmpty()) {
				
				alumnoFind = alumDAO.crud().findByRun(run);
				
				if (alumnoFind!=null) {
					
					String nombreRamo = listaNotas.get(0);
					
					ramoFind = ramoDAO.crud().findByNombre(nombreRamo);
					
					if (ramoFind!=null) {
						
						notaFind = notaDAO.crud().buscarPorIdAlumnoAndIdNotaAndIdSemestre(ramoFind.getIdRamo(), alumnoFind.getIdAlumno(), semestre);
						
						double nota1 = 0;
						double nota2 = 0;
						double nota3 = 0;
						double nota4 = 0;
						double nota5 = 0;
						double nota6 = 0;
						double nota7 = 0;
						double nota8 = 0;
						double promedioFinal = 0;
						
						nota1 = Double.parseDouble(listaNotas.get(1));
						nota2 = Double.parseDouble(listaNotas.get(2));
						nota3 = Double.parseDouble(listaNotas.get(3));
						nota4 = Double.parseDouble(listaNotas.get(4));
						nota5 = Double.parseDouble(listaNotas.get(5));
						nota6 = Double.parseDouble(listaNotas.get(6));
						nota7 = Double.parseDouble(listaNotas.get(7));
						nota8 = Double.parseDouble(listaNotas.get(8));
						
						
						
						notaFind.setNota1(nota1);
						notaFind.setNota2(nota2);
						notaFind.setNota3(nota3);
						notaFind.setNota4(nota4);
						notaFind.setNota5(nota5);
						notaFind.setNota6(nota6);
						notaFind.setNota7(nota7);
						notaFind.setNota8(nota8);
						
						notaDAO.crud().save(notaFind);
						
						
						respuestaServidor = 200;
						
						
					}
					
					
					
				}
				
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
		}
		
		
		return respuestaServidor;
	}
	
	@GetMapping("/exporta-informe-notas/{run}/{semestre}")
	public void exportarNotasPdf(@PathVariable String run, @PathVariable String semestre, HttpSession session) {
		
		Alumno alumnoFind = null;
		Semestre semestreFind = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByRun(run);
			
			if (alumnoFind!=null) {
				
				int nroSemestre = Integer.parseInt(semestre);
				
				semestreFind = semDAO.crud().findBySemestre(nroSemestre);
				
				if (semestreFind!=null) {
					
					notaDAO.descargarPDF(alumnoFind, semestreFind, session);
					
					
					
				}
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		
		
	}
	
	
//	@GetMapping("/exportar-seguimiento-embarque-excel")
//	public ResponseEntity<InputStreamResource> exportarNotasPdf() throws IOException{
//		
//		ByteArrayInputStream stream = embDAO.exportarExcel();
//		
//		HttpHeaders headers = new HttpHeaders();
//		
//		headers.add("Content-Disposition", "attachment; filename=seguimiento_embarque.xlsx");
//		
//		return ResponseEntity.ok().headers(headers).body(new InputStreamResource(stream));
//		
//	}
	
}
