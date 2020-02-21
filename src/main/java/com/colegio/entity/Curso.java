package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.math.BigInteger;


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

	@Column(name="PROFESOR_ID_PROFESOR")
	private BigInteger profesorIdProfesor;

	private String token;

	//uni-directional one-to-one association to Profesor
	@OneToOne
	@JoinColumn(name="ID_CURSO")
	private Profesor profesor;

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

	public BigInteger getProfesorIdProfesor() {
		return this.profesorIdProfesor;
	}

	public void setProfesorIdProfesor(BigInteger profesorIdProfesor) {
		this.profesorIdProfesor = profesorIdProfesor;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Profesor getProfesor() {
		return this.profesor;
	}

	public void setProfesor(Profesor profesor) {
		this.profesor = profesor;
	}

}