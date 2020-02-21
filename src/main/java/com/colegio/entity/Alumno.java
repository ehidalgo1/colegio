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

	@Column(name="APELLIDO_M")
	private String apellidoM;

	@Column(name="APELLIDO_P")
	private String apellidoP;

	private String nombre;

	private String token;

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

	public Alumno(Long idAlumno, String apellidoM, String apellidoP, String nombre, String token, Curso curso,
			List<Ramo> ramos) {
		this.idAlumno = idAlumno;
		this.apellidoM = apellidoM;
		this.apellidoP = apellidoP;
		this.nombre = nombre;
		this.token = token;
		this.curso = curso;
		this.ramos = ramos;
	}

	public Long getIdAlumno() {
		return this.idAlumno;
	}

	public void setIdAlumno(Long idAlumno) {
		this.idAlumno = idAlumno;
	}

	public String getApellidoM() {
		return this.apellidoM;
	}

	public void setApellidoM(String apellidoM) {
		this.apellidoM = apellidoM;
	}

	public String getApellidoP() {
		return this.apellidoP;
	}

	public void setApellidoP(String apellidoP) {
		this.apellidoP = apellidoP;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
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