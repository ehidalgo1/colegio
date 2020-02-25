package com.colegio.DAO.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.colegio.entity.Alumno;

public interface IAlumnoDAO extends CrudRepository<Alumno, Long>{

	@Query(value = "SELECT * FROM ALUMNO WHERE NOMBRE = :nombre AND APELLIDO_P = :apellido", nativeQuery = true)
	Alumno buscarPorNombreAndApellido(@Param("nombre") String nombre,@Param("apellido") String apellido);
	
	@Query(value = "SELECT * FROM ALUMNO WHERE CURSO_ID_CURSO = :idCurso", nativeQuery = true)
	List<Alumno> buscarTodosPorIdCurso(@Param("idCurso") Long idCurso);
	
	Alumno findByToken(String token);
	
	Alumno findByRun(String run);
	
}
