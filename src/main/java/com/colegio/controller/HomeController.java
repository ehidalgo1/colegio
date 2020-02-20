package com.colegio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	@GetMapping("/home")
	public String goHome() {
		String pagina = "";

		try {

			pagina = "home";

		} catch (Exception e) {
			
			e.printStackTrace();
			pagina = "login";
			
		}

		return pagina;
	}
}
