package com.ineuron.domain.product.valueobject;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;

public class Attribute {

	private Integer id;
	private String attribute;
	private String code;
	private String description;

	private static final Logger LOGGER = LoggerFactory.getLogger(Attribute.class);

	public void addAttribute(ProductRepository productRepository) throws RepositoryException {
		productRepository.addAttribute(this);
		
	}

	public void updateAttribute(ProductRepository productRepository) throws RepositoryException {
		productRepository.updateAttribute(this);
	}

	
	public void deleteAttibute(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteAttribute(this);
		
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

}
