package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Semestre;

public interface ISemestreDAO extends CrudRepository<Semestre, Long>{

	Semestre findBySemestre(int semestre);
	
}
