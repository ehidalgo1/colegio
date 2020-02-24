package com.colegio.DAO.interfaces;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.colegio.entity.Alumno;
import com.colegio.entity.Personalidad;

public interface IPersonalidadDAO extends CrudRepository<Personalidad, Long>{

	Personalidad findByAlumno(Alumno alumno);
	
	@Query(value = "SELECT * FROM PERSONALIDAD WHERE ALUMNO_ID_ALUMNO = :idAlumno",nativeQuery = true)
	Personalidad buscarPorIdAlumno(@Param("idAlumno") Long idAlumno);
	
}
