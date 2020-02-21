package com.colegio.DAO.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.colegio.entity.Curso;

public interface ICursoDAO extends CrudRepository<Curso, Long>{

	Curso findByToken(String token);
}
