package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IProfesorDAO;

@Transactional
@Repository
public class ProfesorDAO {

	@Autowired
	private IProfesorDAO crud;
	
	public IProfesorDAO crud() {
		return this.crud;
	}
	
}
