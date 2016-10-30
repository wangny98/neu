package com.ineuron.dataaccess.db;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class INeuronDBConnection {
	
	static SqlSessionFactory sqlSessionFactory;

	private INeuronDBConnection() {
		
	}
	
	public static SqlSessionFactory getSessionFactory(){
		if(sqlSessionFactory == null){
			String resource = "mybatis-config.xml";
			InputStream inputStream = null;
			try {
				inputStream = Resources.getResourceAsStream(resource);
			} catch (IOException e) {
				e.printStackTrace();
			}
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		}
		
		return sqlSessionFactory;
	}
	

}
