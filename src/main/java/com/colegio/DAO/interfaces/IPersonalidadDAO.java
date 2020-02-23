package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Alumno;
import com.colegio.entity.Personalidad;

public interface IPersonalidadDAO extends CrudRepository<Personalidad, Long>{

	Personalidad findByAlumno(Alumno alumno);
	
}
