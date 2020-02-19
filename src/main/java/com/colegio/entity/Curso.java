package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the curso database table.
 * 
 */
@Entity
@NamedQuery(name="Curso.findAll", query="SELECT c FROM Curso c")
public class Curso implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_CURSO")
	private Long idCurso;

	@Column(name="NUMERO_CURSO")
	private String numeroCurso;

	private String token;

	public Curso() {
	}

	public Long getIdCurso() {
		return this.idCurso;
	}

	public void setIdCurso(Long idCurso) {
		this.idCurso = idCurso;
	}

	public String getNumeroCurso() {
		return this.numeroCurso;
	}

	public void setNumeroCurso(String numeroCurso) {
		this.numeroCurso = numeroCurso;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}