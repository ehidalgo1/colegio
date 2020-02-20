package com.colegio.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Alumno;

public interface IAlumnoDAO extends CrudRepository<Alumno, Long>{

	
}
