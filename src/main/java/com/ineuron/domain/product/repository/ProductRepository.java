package com.ineuron.domain.product.repository;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.dataaccess.db.INeuronDBConnection;
import com.ineuron.domain.product.entity.*;
import com.ineuron.domain.product.valueobject.Attribute;
import com.ineuron.domain.product.valueobject.ManufacturingProcess;
import com.ineuron.domain.product.valueobject.Material;
import com.ineuron.domain.user.valueobject.Operation;

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
			System.out.println("product: "+product.getProductname());
			session.insert("addProduct", product);
			session.commit();
			System.out.println("insert product by using mybatis!");
		} finally {
			session.close();
		}
	}

	public void updateProduct(Product product) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("updateProduct", product);
			session.commit();
			System.out.println("update product by using mybatis!");
		} finally {
			session.close();
		}
	}
	
	public void deleteProduct(Product product) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("deleteProduct", product);
			session.commit();
			System.out.println("delete product by using mybatis!");
		} finally {
			session.close();
		}
	}
	
	public List<Product> getProductList() throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<Product> products = session.selectList("getProducts");
			return products;
		} finally {
			session.close();
		}
	}
	
	public void addAttribute(Attribute attribute) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("attribute: "+attribute.getAttribute());
			session.insert("addAttribute", attribute);
			session.commit();
			System.out.println("insert attribute by using mybatis!");
		} finally {
			session.close();
		}
	}

	public void updateAttribute(Attribute attribute) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("attribute: "+attribute.getAttribute());
			session.update("updateAttribute", attribute);
			session.commit();
			System.out.println("update attribute by using mybatis!");
		} finally {
			session.close();
		}
	}
	
	
	public void deleteAttribute(Attribute attribute) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("attribute: "+attribute.getAttribute());
			session.update("deleteAttribute", attribute);
			session.commit();
			System.out.println("delete attribute by using mybatis!");
		} finally {
			session.close();
		}
	}


	public List<Attribute> getAttributeList(Integer productid) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		//System.out.println("getAttributeList: "+"productid: "+productid);
		try {
			List<Attribute> attributes = session.selectList("getAttributesByProductID", productid);
			//System.out.println("attributelist size "+attributes.get(0).getAttribute());
			return attributes;
		} finally {
			session.close();
		}
	}
	
	
	public List<ManufacturingProcess> getProcessList(Integer productId) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<ManufacturingProcess> processes = session.selectList("getProcesses", productId);
			return processes; 
		} finally {
				session.close();
			}
		}
	
	


	public List<Operation> getOperationList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<Operation> operations = session.selectList("getOperations");
			return operations;
		} finally {
			session.close();
		}
	}
	
	
	public List<Material> getMaterialList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<Material> materials = session.selectList("getMaterials");
			return materials;
		} finally {
			session.close();
		}
	}


	public void saveProcesses(List<ManufacturingProcess> processes) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			if(processes != null && processes.size() > 0){
				session.delete("deleteProcesses", processes.get(0).getProductId());
				for(int i = 0; i < processes.size(); i ++){
					ManufacturingProcess process = processes.get(i);
					process.setOrderId(i);
					session.insert("insertProcess", process);
				}
				session.commit();
			}
			
		} finally {
			session.close();
		}
	}
}
