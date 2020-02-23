package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IPersonalidadDAO;

@Transactional
@Repository
public class PersonalidadDAO {

	@Autowired
	private IPersonalidadDAO ipersonalDAO;
	
	public IPersonalidadDAO crud() {
		return this.ipersonalDAO;
	}
	
}
