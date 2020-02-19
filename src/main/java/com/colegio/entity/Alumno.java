package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the alumno database table.
 * 
 */
@Entity
@NamedQuery(name="Alumno.findAll", query="SELECT a FROM Alumno a")
public class Alumno implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_ALUMNO")
	private Long idAlumno;

	private String apellido;

	private String nombre;

	private int token;

	//uni-directional many-to-one association to Curso
	@ManyToOne
	private Curso curso;

	//uni-directional many-to-many association to Ramo
	@ManyToMany
	@JoinTable(
		name="alumno_ramo"
		, joinColumns={
			@JoinColumn(name="ALUMNO_ID_ALUMNO")
			}
		, inverseJoinColumns={
			@JoinColumn(name="RAMO_ID_RAMO")
			}
		)
	private List<Ramo> ramos;

	public Alumno() {
	}

	public Long getIdAlumno() {
		return this.idAlumno;
	}

	public void setIdAlumno(Long idAlumno) {
		this.idAlumno = idAlumno;
	}

	public String getApellido() {
		return this.apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getToken() {
		return this.token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public Curso getCurso() {
		return this.curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public List<Ramo> getRamos() {
		return this.ramos;
	}

	public void setRamos(List<Ramo> ramos) {
		this.ramos = ramos;
	}

}