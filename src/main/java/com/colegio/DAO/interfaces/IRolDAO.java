package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Rol;

public interface IRolDAO extends CrudRepository<Rol, Long>{

	Rol findByNombreRol(String nombreRol);
	
}
