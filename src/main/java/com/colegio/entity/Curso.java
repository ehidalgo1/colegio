package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


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

	//uni-directional many-to-many association to Ramo
	@ManyToMany
	@JoinTable(
		name="curso_ramo"
		, joinColumns={
			@JoinColumn(name="CURSO_ID_CURSO")
			}
		, inverseJoinColumns={
			@JoinColumn(name="RAMO_ID_RAMO")
			}
		)
	private List<Ramo> ramos;

	public Curso() {
	}

	public Curso(Long idCurso, String numeroCurso, String token, List<Ramo> ramos) {
		super();
		this.idCurso = idCurso;
		this.numeroCurso = numeroCurso;
		this.token = token;
		this.ramos = ramos;
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

	public List<Ramo> getRamos() {
		return this.ramos;
	}

	public void setRamos(List<Ramo> ramos) {
		this.ramos = ramos;
	}

}