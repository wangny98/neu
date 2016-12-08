package com.ineuron.domain.product.valueobject;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;

public class AttributeCategory {

	private Integer id;
	private String name;

	private static final Logger LOGGER = LoggerFactory.getLogger(Attribute.class);

	/*public void addAttributeCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.addAttributeCategory(this);
		
	}

	public void updateAttributeCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.updateAttributeCategory(this);
	}

	
	public void deleteAttibuteCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteAttributeCategory(this);
		
	}*/
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	

}
