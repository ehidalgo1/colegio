package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the profesor database table.
 * 
 */
@Entity
@NamedQuery(name="Profesor.findAll", query="SELECT p FROM Profesor p")
public class Profesor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_PROFESOR")
	private Long idProfesor;

	private String apellido;

	private String especialidad;

	private String nombre;

	private String password;

	private String token;

	private String usuario;

	//uni-directional many-to-one association to Curso
	@ManyToOne
	private Curso curso;

	//uni-directional many-to-many association to Rol
	@ManyToMany
	@JoinTable(
		name="profesor_rol"
		, joinColumns={
			@JoinColumn(name="PROFESOR_ID_PROFESOR")
			}
		, inverseJoinColumns={
			@JoinColumn(name="ROL_ID_ROL")
			}
		)
	private List<Rol> rols;

	public Profesor() {
	}

	public Profesor(Long idProfesor, String apellido, String especialidad, String nombre, String password, String token,
			String usuario, Curso curso, List<Rol> rols) {

		this.idProfesor = idProfesor;
		this.apellido = apellido;
		this.especialidad = especialidad;
		this.nombre = nombre;
		this.password = password;
		this.token = token;
		this.usuario = usuario;
		this.curso = curso;
		this.rols = rols;
	}

	public Long getIdProfesor() {
		return this.idProfesor;
	}

	public void setIdProfesor(Long idProfesor) {
		this.idProfesor = idProfesor;
	}

	public String getApellido() {
		return this.apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEspecialidad() {
		return this.especialidad;
	}

	public void setEspecialidad(String especialidad) {
		this.especialidad = especialidad;
	}

	public String getNombre() {
		return this.nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getUsuario() {
		return this.usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public Curso getCurso() {
		return this.curso;
	}

	public void setCurso(Curso curso) {
		this.curso = curso;
	}

	public List<Rol> getRols() {
		return this.rols;
	}

	public void setRols(List<Rol> rols) {
		this.rols = rols;
	}

}