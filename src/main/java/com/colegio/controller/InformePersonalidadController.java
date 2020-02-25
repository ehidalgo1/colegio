package com.colegio.controller;

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

		try {

			alumnoFind = alumDAO.crud().findByToken(token);

			if (alumnoFind != null) {

				model.addAttribute("alumno", alumnoFind);

				personalidadPorAlumno = personDAO.crud().buscarPorIdAlumno(alumnoFind.getIdAlumno());

				if (personalidadPorAlumno != null) {

					model.addAttribute("personalidad", personalidadPorAlumno);

				}

			} else {

				pagina = "redirect:home";

			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			personalidadPorAlumno = new Personalidad();

			pagina = "redirect:home";
		}

		return pagina;

	}

	@ResponseBody
	@PostMapping("/guardar-informe-personalidad/{runAlumno}/{semestre}")
	public Integer guardarPersonalidadAlumnoPrimerSemestre(@PathVariable String runAlumno,@PathVariable String semestre,
			@RequestParam("campo_0") String campo0, @RequestParam("campo_1") String campo1,
			@RequestParam("campo_2") String campo2, @RequestParam("campo_3") String campo3,
			@RequestParam("campo_4") String campo4, @RequestParam("campo_5") String campo5,
			@RequestParam("campo_6") String campo6, @RequestParam("campo_7") String campo7,
			@RequestParam("campo_8") String campo8, @RequestParam("campo_9") String campo9,
			@RequestParam("campo_10") String campo10, @RequestParam("campo_11") String campo11,
			@RequestParam("campo_12") String campo12, @RequestParam("campo_13") String campo13,
			@RequestParam("campo_14") String campo14, @RequestParam("campo_15") String campo15,
			@RequestParam("campo_16") String campo16, @RequestParam("campo_17") String campo17,
			@RequestParam("campo_18") String campo18, @RequestParam("campo_19") String campo19,
			@RequestParam("campo_20") String campo20, @RequestParam("campo_21") String campo21) {

		int respuestaServidor = 0;
		Alumno alumnoFind = null;
		Semestre semestreFind = null;
		Personalidad personalidad = null;
		
		try {
			
			
			alumnoFind = alumDAO.crud().findByRun(runAlumno);
			
			if (alumnoFind!=null) {
				
				int nroSemestre = Integer.parseInt(semestre);
				
				semestreFind = semDAO.crud().findBySemestre(nroSemestre);
				
				Long idPersonalidad = (long) 0;
				
				personalidad = new Personalidad(idPersonalidad,campo0, campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8, campo9, campo10, campo11, campo12, campo13, campo14, campo15, campo16, campo17, campo18, campo19, campo20, campo21, alumnoFind,semestreFind);
				
				personDAO.crud().save(personalidad);
				
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			respuestaServidor = 500;
		}

		return respuestaServidor;

	}

}
