package com.ineuron.dataaccess.db;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.ineuron.common.exception.RepositoryException;

public class INeuronDBConnection {
	
	static SqlSessionFactory sqlSessionFactory;

	private INeuronDBConnection() {
		
	}
	
	public static SqlSession getSession() throws RepositoryException{
		if(sqlSessionFactory == null){
			String resource = "com/ineuron/dataaccess/db/mybatis-config.xml";
			InputStream inputStream = null;
			try {
				inputStream = Resources.getResourceAsStream(resource);
			} catch (IOException e) {
				throw new RepositoryException("failed to load mybatis-config.xml", e);
			}
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		}
		
		return sqlSessionFactory.openSession();
	}
	

}
