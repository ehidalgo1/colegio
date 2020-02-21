package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Profesor;

public interface IProfesorDAO extends CrudRepository<Profesor, Long>{

	
	Profesor findByNombreAndApellido(String nombre, String apellido);
}
