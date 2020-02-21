package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the ramo database table.
 * 
 */
@Entity
@NamedQuery(name="Ramo.findAll", query="SELECT r FROM Ramo r")
public class Ramo implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_RAMO")
	private Long idRamo;

	private String nombre;

	@Column(name="NOTA_1")
	private double nota1;

	@Column(name="NOTA_2")
	private double nota2;

	@Column(name="NOTA_3")
	private double nota3;

	@Column(name="NOTA_4")
	private double nota4;

	@Column(name="NOTA_5")
	private double nota5;

	@Column(name="NOTA_6")
	private double nota6;

	@Column(name="NOTA_7")
	private double nota7;

	@Column(name="NOTA_8")
	private double nota8;

	private String token;

	public Ramo() {
	}

	public Ramo(Long idRamo, String nombre, double nota1, double nota2, double nota3, double nota4, double nota5,
			double nota6, double nota7, double nota8, String token) {
		super();
		this.idRamo = idRamo;
		this.nombre = nombre;
		this.nota1 = nota1;
		this.nota2 = nota2;
		this.nota3 = nota3;
		this.nota4 = nota4;
		this.nota5 = nota5;
		this.nota6 = nota6;
		this.nota7 = nota7;
		this.nota8 = nota8;
		this.token = token;
	}

	public Long getIdRamo() {
		return this.idRamo;
	}

	public void setIdRamo(Long idRamo) {
		this.idRamo = idRamo;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public double getNota1() {
		return this.nota1;
	}

	public void setNota1(double nota1) {
		this.nota1 = nota1;
	}

	public double getNota2() {
		return this.nota2;
	}

	public void setNota2(double nota2) {
		this.nota2 = nota2;
	}

	public double getNota3() {
		return this.nota3;
	}

	public void setNota3(double nota3) {
		this.nota3 = nota3;
	}

	public double getNota4() {
		return this.nota4;
	}

	public void setNota4(double nota4) {
		this.nota4 = nota4;
	}

	public double getNota5() {
		return this.nota5;
	}

	public void setNota5(double nota5) {
		this.nota5 = nota5;
	}

	public double getNota6() {
		return this.nota6;
	}

	public void setNota6(double nota6) {
		this.nota6 = nota6;
	}

	public double getNota7() {
		return this.nota7;
	}

	public void setNota7(double nota7) {
		this.nota7 = nota7;
	}

	public double getNota8() {
		return this.nota8;
	}

	public void setNota8(double nota8) {
		this.nota8 = nota8;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}