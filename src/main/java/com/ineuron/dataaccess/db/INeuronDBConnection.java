package com.ineuron.dataaccess.db;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class INeuronDBConnection {
	
	static SqlSessionFactory sqlSessionFactory;

	private INeuronDBConnection() {
		
	}
	
	public static SqlSession getSession(){
		if(sqlSessionFactory == null){
			String resource = "com/ineuron/dataaccess/db/mybatis-config.xml";
			InputStream inputStream = null;
			try {
				inputStream = Resources.getResourceAsStream(resource);
			} catch (IOException e) {
				e.printStackTrace();
			}
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		}
		
		return sqlSessionFactory.openSession();
	}
	

}
