package com.colegio.service;

import org.springframework.stereotype.Service;

@Service
public class CalculoService {

	
	public double Redondear(double numero,int digitos)
	{
	      int cifras=(int) Math.pow(10,digitos);
	      return Math.rint(numero*cifras)/cifras;
	}
	
}
