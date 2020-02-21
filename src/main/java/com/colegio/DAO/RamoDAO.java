package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.IRamoDAO;

@Transactional
@Repository
public class RamoDAO {

	
	@Autowired
	private IRamoDAO iRamoDAO;
	
	public IRamoDAO crud() {
		return this.iRamoDAO;
	}
	
}
