package com.colegio.DAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FuncionesDAO {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	

	public FuncionesDAO() {
		
	}


	public String funcionToken() {
		String token = null;
		String sql = "SELECT FN_GENERAR_TOKEN() FROM DUAL";
		
		token = jdbcTemplate.queryForObject(sql, new Object[] {}, String.class);
				
		return token;
	}
	
	
	
	
}
