package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.ISemestreDAO;

@Transactional
@Repository
public class SemestreDAO {

	@Autowired
	private ISemestreDAO isemestreDAO;
	
	public ISemestreDAO crud() {
		return this.isemestreDAO;
	}
	
}
