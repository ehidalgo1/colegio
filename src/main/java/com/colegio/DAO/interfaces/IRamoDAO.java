package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Ramo;

public interface IRamoDAO extends CrudRepository<Ramo, Long>{

	Ramo findByNombre(String nombre);
	
	
}
