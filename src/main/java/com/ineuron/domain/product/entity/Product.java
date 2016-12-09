package com.ineuron.domain.product.entity;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;

public class Product {

	private Integer id;
	private String name;
	private String code;
	private Integer productCategoryId;
	private Integer serialNumber;
	private Integer formulaId;
	private String description;
	

	private static final Logger LOGGER = LoggerFactory.getLogger("Product");

	public void addProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.addProduct(this);
	}

	public void updateProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.updateProduct(this);
	}
	
	public void deleteProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteProduct(this);
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getProductCategoryId() {
		return productCategoryId;
	}

	public void setProductCategoryId(Integer productCategoryId) {
		this.productCategoryId = productCategoryId;
	}
	
	public Integer getFormulaId() {
		return formulaId;
	}

	public void setFormulaId(Integer formulaId) {
		this.formulaId = formulaId;
	}
	
	public Integer getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(Integer serialNumber) {
		this.serialNumber = serialNumber;
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
}
