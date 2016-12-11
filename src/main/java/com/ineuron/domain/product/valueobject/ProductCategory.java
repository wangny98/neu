package com.ineuron.domain.product.valueobject;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;

public class ProductCategory {

	private Integer id;
	private String name;
	private String code;
	private String description;
	private String characters;
	private String techParameters;
	private String scope;

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductCategory.class);

	public void addProductCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.addProductCategory(this);
		
	}

	/*public void updateProductCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.updateProductCategory(this);
	}

	
	public void deleteProductCategory(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteProductCategory(this);
		
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
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

	public String getCharacters() {
		return characters;
	}
	
	public void setCharacters(String characters) {
		this.characters = characters;
	}
	
	public String getTechParameters() {
		return techParameters;
	}
	
	public void setTechParameters(String techParameters) {
		this.techParameters = techParameters;
	}
	
	public String getScope() {
		return scope;
	}
	
	public void setScope(String scope) {
		this.scope = scope;
	}
}
