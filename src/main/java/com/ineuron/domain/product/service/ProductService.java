package com.ineuron.domain.product.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.repository.ProductRepository;

public class ProductService {

	@Inject
	ProductRepository productRepository;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);
	
	public void createProduct(Product product) throws RepositoryException {
		product.addProduct(productRepository);
	}
	
	public void updateProduct(Product product) throws RepositoryException {
		product.updateProduct(productRepository);
	}
	
	public List<Product> getProductList() throws RepositoryException, INeuronException{
		
		List<Product> productList = productRepository.getProductList();
		return productList;
	}

}
