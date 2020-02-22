package com.colegio.DAO.interfaces;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Alumno;
import com.colegio.entity.Nota;

public interface INotaDAO extends CrudRepository<Nota, Long>{

	List<Nota> findByAlumno(Alumno alumno);
}
