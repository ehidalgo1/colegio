package com.colegio.controller;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colegio.DAO.AlumnoDAO;
import com.colegio.DAO.PersonalidadDAO;
import com.colegio.DAO.SemestreDAO;
import com.colegio.entity.Alumno;
import com.colegio.entity.Personalidad;
import com.colegio.entity.Semestre;

@Controller
public class InformePersonalidadController {

	@Autowired
	private PersonalidadDAO personDAO;

	@Autowired
	private AlumnoDAO alumDAO;

	@Autowired
	private SemestreDAO semDAO;

	@GetMapping("/informe-personalidad/{token}")
	public String goInformePersonalidad(@PathVariable String token, HttpSession session, Model model) {

		String pagina = "informe-personalidad";
		Alumno alumnoFind = null;
		Personalidad personalidadPorAlumno = null;
		List<Semestre> listaSemestres = null;

		try {

			alumnoFind = alumDAO.crud().findByToken(token);

			if (alumnoFind != null) {

				listaSemestres = (List<Semestre>) semDAO.crud().findAll();

				model.addAttribute("listaSemestres", listaSemestres);

				model.addAttribute("alumno", alumnoFind);

				pagina = "informe-personalidad";

			} else {

				pagina = "redirect:home";

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();

			pagina = "redirect:home";
		}

		return pagina;

	}
	
	@ResponseBody
	@GetMapping("/obtener-personalidad-alumno/{run}/{semestre}")
	public Personalidad obtenerInformePersonalidadAlumnoSemestre(@PathVariable String run, @PathVariable String semestre) {
		
		Alumno alumnoFind = null;
		Personalidad personalidadFind = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByRun(run);
			
			if (alumnoFind!=null) {
				
				int idSemestre = Integer.parseInt(semestre);
				
				
				personalidadFind = personDAO.crud().buscarPorIdAlumnoAndIdSemestre(alumnoFind.getIdAlumno(), idSemestre);
				
				if (personalidadFind==null) {
					
					personalidadFind = new Personalidad();
					
				}
				
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			
			personalidadFind = new Personalidad();
		}
		
		
		return personalidadFind;
		
	}
	
	

	@ResponseBody
	@PostMapping("/guardar-informe-personalidad/{run}/{semestre}")
	public Integer guardarPersonalidadAlumnoPrimerSemestre(@PathVariable String run, @PathVariable String semestre, @RequestParam("campo_1") String campo1,
			@RequestParam("campo_2") String campo2, @RequestParam("campo_3") String campo3,
			@RequestParam("campo_4") String campo4, @RequestParam("campo_5") String campo5,
			@RequestParam("campo_6") String campo6, @RequestParam("campo_7") String campo7,
			@RequestParam("campo_8") String campo8, @RequestParam("campo_9") String campo9,
			@RequestParam("campo_10") String campo10, @RequestParam("campo_11") String campo11,
			@RequestParam("campo_12") String campo12, @RequestParam("campo_13") String campo13,
			@RequestParam("campo_14") String campo14, @RequestParam("campo_15") String campo15,
			@RequestParam("campo_16") String campo16, @RequestParam("campo_17") String campo17,
			@RequestParam("campo_18") String campo18, @RequestParam("campo_19") String campo19,
			@RequestParam("campo_20") String campo20, @RequestParam("campo_21") String campo21, @RequestParam("comentario") String comentario) {

		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		Semestre semestreFind = null;
		Personalidad personalidadFind = null;
		Personalidad personalidad = null;

		try {

			alumnoFind = alumDAO.crud().findByRun(run);

			if (alumnoFind != null) {

				int nroSemestre = Integer.parseInt(semestre);

				semestreFind = semDAO.crud().findBySemestre(nroSemestre);
				
				personalidadFind = personDAO.crud().buscarPorIdAlumnoAndIdSemestre(alumnoFind.getIdAlumno(), semestreFind.getIdSemestre());
				
				if (personalidadFind==null) {
					
					
					Long idPersonalidad = (long) 0;

					personalidad = new Personalidad(idPersonalidad, campo1, campo2, campo3, campo4, campo5, campo6,
							campo7, campo8, campo9, campo10, campo11, campo12, campo13, campo14, campo15, campo16, campo17,
							campo18, campo19, campo20, campo21, comentario.toUpperCase(), alumnoFind, semestreFind);
					

					personDAO.crud().save(personalidad);
					
					
				}else {
					
					
					personalidadFind.setHigienePresentacion(campo1);
					personalidadFind.setAutoestimaValoracion(campo2);
					personalidadFind.setSuperaErrores(campo3);
					personalidadFind.setToleraFrustraciones(campo4);
					personalidadFind.setControlaImpulsos(campo5);
					personalidadFind.setIntegraGrupo(campo6);
					personalidadFind.setResuelveProblemasInterpersonales(campo7);
					personalidadFind.setRespetaNormasConvivencia(campo8);
					personalidadFind.setActitudRespetuosa(campo9);
					personalidadFind.setPreocupacionSolidaridad(campo10);
					personalidadFind.setRespetaBienes(campo11);
					personalidadFind.setTrabajoContinuo(campo12);
					personalidadFind.setResponsableDeberes(campo13);
					personalidadFind.setParticipaClases(campo14);
					personalidadFind.setDemuestraEmprendimiento(campo15);
					personalidadFind.setIntercambiaConocimientos(campo16);
					personalidadFind.setSuperaDificultades(campo17);
					personalidadFind.setTrabajaClases(campo18);
					personalidadFind.setAcataNormas(campo19);
					personalidadFind.setDispuestoConcentrado(campo20);
					personalidadFind.setPositivoParticipativo(campo21);
					personalidadFind.setObservaciones(comentario);
					
					personDAO.crud().save(personalidadFind);
					
					
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
	
	
	
	@GetMapping("/exporta-informe-personalidad/{run}/{semestre}")
	public ResponseEntity<Resource> exportarNotasPdf(@PathVariable String run, @PathVariable String semestre, HttpSession session) {
		
		Alumno alumnoFind = null;
		Semestre semestreFind = null;
		Resource resource = null;
		
		try {
			
			alumnoFind = alumDAO.crud().findByRun(run);
			
			if (alumnoFind!=null) {
				
				int nroSemestre = Integer.parseInt(semestre);
				
				semestreFind = semDAO.crud().findBySemestre(nroSemestre);
				
				if (semestreFind!=null) {
					
					personDAO.descargarPDF(alumnoFind, semestreFind, session);
					
					String rutaPdf = ".//src//main//webapp//static//archivos//Informe_personalidad.pdf";

					Path path = Paths.get(rutaPdf);
					

					resource = new UrlResource(path.toUri());
					

				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType("application/pdf"))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
		
		
	}
	
	
	
	
	
	
	

}
