package com.colegio.DAO.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;

public interface INotaDAO extends CrudRepository<Nota, Long>{

	List<Nota> findByAlumno(Alumno alumno);
	
	@Query(value = "SELECT * FROM NOTA WHERE RAMO_ID_RAMO = :idRamo AND ALUMNO_ID_ALUMNO = :idAlumno", nativeQuery = true)
	Nota buscarPorIdAlumnoAndIdNota(@Param("idRamo") Long idRamo, @Param("idAlumno") Long idAlumno);
}
