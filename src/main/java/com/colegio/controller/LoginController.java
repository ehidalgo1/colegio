package com.colegio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
	
	
	@GetMapping({"/","login"})
	public String goLogin() {
		
		String pagina = ""; 
		
		try {
			
			pagina = "login";
			
		} catch (Exception e) {
			
			e.printStackTrace();
			
			 pagina = "login";
			
		}
		
		return pagina;
		
	}
	
	
	

}
