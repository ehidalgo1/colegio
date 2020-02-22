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

	private String token;

	public Ramo() {
	}

	public Ramo(Long idRamo, String nombre, String token) {
		super();
		this.idRamo = idRamo;
		this.nombre = nombre;
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

	public String getToken() {
		return this.token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}