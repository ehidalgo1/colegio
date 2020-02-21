package com.colegio.entity;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the rol database table.
 * 
 */
@Entity
@NamedQuery(name="Rol.findAll", query="SELECT r FROM Rol r")
public class Rol implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="ID_ROL")
	private Long idRol;

	@Column(name="NOMBRE_ROL")
	private String nombreRol;

	private String token;

	public Rol() {
	}

	public Rol(Long idRol, String nombreRol, String token) {
		this.idRol = idRol;
		this.nombreRol = nombreRol;
		this.token = token;
	}

	public Long getIdRol() {
		return this.idRol;
	}

	public void setIdRol(Long idRol) {
		this.idRol = idRol;
	}

	public String getNombreRol() {
		return this.nombreRol;
	}

	public void setNombreRol(String nombreRol) {
		this.nombreRol = nombreRol;
	}

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}