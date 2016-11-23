package com.ineuron.domain.product.repository;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.dataaccess.db.INeuronDBConnection;
import com.ineuron.domain.product.entity.*;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductRepository {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(ProductRepository.class);

	public ProductRepository() {

	}

	
	public void addProduct(Product product) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("product: "+product.getProductname());
			session.insert("addProduct", product);
			session.commit();
			System.out.println("insert product by using mybatis!");
		} finally {
			session.close();
		}
	}

	

}
