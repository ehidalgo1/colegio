package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IAlumnoDAO;

@Transactional
@Repository
public class AlumnoDAO {

	@Autowired
	private IAlumnoDAO crud;
	
	public IAlumnoDAO crud() {
		return this.crud;
	}
	
}
