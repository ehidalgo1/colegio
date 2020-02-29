package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IRolDAO;

@Transactional
@Repository
public class RolDAO {

	@Autowired
	private IRolDAO irolDAO;
	
	public IRolDAO crud() {
		return this.irolDAO;
	}
	
}
