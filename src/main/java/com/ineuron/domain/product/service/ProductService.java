package com.ineuron.domain.product.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Inject;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.entity.Formula;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.valueobject.Attribute;
import com.ineuron.domain.product.valueobject.FormulaMaterial;
import com.ineuron.domain.product.repository.ProductRepository;
import com.ineuron.domain.product.valueobject.ManufacturingProcess;
import com.ineuron.domain.product.valueobject.Material;
import com.ineuron.domain.user.valueobject.Operation;

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
	
	public void deleteProduct(Product product) throws RepositoryException {
		product.deleteProduct(productRepository);
	}
	
	public List<Product> getProductList() throws RepositoryException{
		
		List<Product> productList = productRepository.getProductList();
		return productList;
	}
	
	public void createAttribute(Attribute attribute) throws RepositoryException {
		attribute.addAttribute(productRepository);
	}
	
	public void updateAttribute(Attribute attribute) throws RepositoryException {
		attribute.updateAttribute(productRepository);
	}
	
	public void deleteAttribute(Attribute attribute) throws RepositoryException {
		attribute.deleteAttibute(productRepository);
	}

	public List<Attribute> getAttributeList(Integer productid) throws RepositoryException{
		
		List<Attribute> attributeList = productRepository.getAttributeList(productid);
		return attributeList;
	}

	public List<ManufacturingProcess> getProcessList(Integer productId) throws RepositoryException {
		List<ManufacturingProcess> processes = productRepository.getProcessList(productId);
		return processes;
	}

	public List<Operation> getOperations() throws RepositoryException {
		List<Operation> operationList = productRepository.getOperationList();
		return operationList;
	}
	
	public List<Material> getMaterials() throws RepositoryException {
		List<Material> materialList = productRepository.getMaterialList();
		return materialList;
	}
	
	public List<Formula> getFormulas() throws RepositoryException {
		List<Formula> formulaList = productRepository.getFormulaList();
		return formulaList;
	}

	public void saveProcesses(List<ManufacturingProcess> processes) throws RepositoryException {
		
		productRepository.saveProcesses(processes);
		
	}

	public void addFormula(Formula formula) throws RepositoryException {
		formula.addFormula(productRepository);
		
	}

	public void updateFormula(Formula formula) throws RepositoryException {
		formula.updateFormula(productRepository);
		
	}

	public List<FormulaMaterial> getFormulaMaterials(int formulaId) throws RepositoryException {
		
		Formula formula = new Formula();
		formula.setId(formulaId);
		
		return formula.getMaterials(productRepository);
	}

	public void deleteFormula(int id) throws RepositoryException {
		Formula formula = new Formula();
		formula.setId(id);
		formula.deleteFormula(productRepository);
		
	}

}
