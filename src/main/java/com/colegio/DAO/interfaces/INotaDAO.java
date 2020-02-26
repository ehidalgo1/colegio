package com.colegio.DAO.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;
import com.colegio.entity.Semestre;

public interface INotaDAO extends CrudRepository<Nota, Long>{

	List<Nota> findByAlumnoAndSemestre(Alumno alumno, Semestre semestre);
	
	@Query(value = "SELECT * FROM NOTA WHERE RAMO_ID_RAMO = :idRamo AND ALUMNO_ID_ALUMNO = :idAlumno", nativeQuery = true)
	Nota buscarNotasPorAlumno(@Param("idRamo") Long idRamo, @Param("idAlumno") Long idAlumno);
	
	@Query(value = "SELECT * FROM NOTA WHERE RAMO_ID_RAMO = :idRamo AND ALUMNO_ID_ALUMNO = :idAlumno AND SEMESTRE_ID_SEMESTRE = :idSemestre", nativeQuery = true)
	Nota buscarPorIdAlumnoAndIdNotaAndIdSemestre(@Param("idRamo") Long idRamo, @Param("idAlumno") Long idAlumno, @Param("idSemestre") Long idSemestre);

	@Query(value = "SELECT * FROM NOTA WHERE ALUMNO_ID_ALUMNO = :idAlumno AND SEMESTRE_ID_SEMESTRE = :idSemestre", nativeQuery = true)
	List<Nota> buscarNotasPorAlumnoAndSemestre(@Param("idAlumno") Long idAlumno, @Param("idSemestre") int idSemestre);
	
}
