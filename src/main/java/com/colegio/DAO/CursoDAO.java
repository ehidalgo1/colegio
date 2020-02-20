package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.interfaces.ICursoDAO;

@Transactional
@Repository
public class CursoDAO {

	@Autowired
	private ICursoDAO crud;
	
	public ICursoDAO crud() {
		return this.crud;
	}
}
