package com.colegio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminProfesoresController {

	
	@GetMapping("/administracion-profesores")
	public String goAdminProfesores() {
		return "administracion-profesores";
	}
}
