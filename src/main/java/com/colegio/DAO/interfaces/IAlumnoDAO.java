package com.colegio.DAO.interfaces;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.colegio.entity.Alumno;

public interface IAlumnoDAO extends CrudRepository<Alumno, Long>{

	@Query(value = "SELECT * FROM ALUMNO WHERE NOMBRE = :nombre AND APELLIDO_P = :apellido", nativeQuery = true)
	Alumno buscarPorNombreAndApellido(@Param("nombre") String nombre,@Param("apellido") String apellido);
}
