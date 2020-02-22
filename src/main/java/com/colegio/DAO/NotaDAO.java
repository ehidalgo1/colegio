package com.colegio.DAO;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.colegio.DAO.interfaces.INotaDAO;

@Transactional
@Repository
public class NotaDAO {

	@Autowired
	private INotaDAO iNotaDao;
	
	public INotaDAO crud() {
		return this.iNotaDao;
	}
	
}
