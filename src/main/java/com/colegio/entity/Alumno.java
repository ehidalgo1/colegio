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

	private String pNombre;
	
	private String sNombre;
	
	private String apellidoP;
	
	private String apellidoM;

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

	public Alumno(Long idAlumno, String pNombre, String sNombre, String apellidoP, String apellidoM, String token,
			Curso curso, List<Ramo> ramos) {
		this.idAlumno = idAlumno;
		this.pNombre = pNombre;
		this.sNombre = sNombre;
		this.apellidoP = apellidoP;
		this.apellidoM = apellidoM;
		this.token = token;
		this.curso = curso;
		this.ramos = ramos;
	}

	public Long getIdAlumno() {
		return idAlumno;
	}

	public void setIdAlumno(Long idAlumno) {
		this.idAlumno = idAlumno;
	}

	public String getpNombre() {
		return pNombre;
	}

	public void setpNombre(String pNombre) {
		this.pNombre = pNombre;
	}

	public String getsNombre() {
		return sNombre;
	}

	public void setsNombre(String sNombre) {
		this.sNombre = sNombre;
	}

	public String getApellidoP() {
		return apellidoP;
	}

	public void setApellidoP(String apellidoP) {
		this.apellidoP = apellidoP;
	}

	public String getApellidoM() {
		return apellidoM;
	}

	public void setApellidoM(String apellidoM) {
		this.apellidoM = apellidoM;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Curso getCurso() {
		return curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public List<Ramo> getRamos() {
		return ramos;
	}

	public void setRamos(List<Ramo> ramos) {
		this.ramos = ramos;
	}
	
	

}