package com.ineuron.domain.product.entity;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;
import com.ineuron.domain.product.valueobject.ManufacturingProcess;
import com.ineuron.domain.product.valueobject.Operation;
import com.ineuron.domain.product.valueobject.OperationType;
import com.ineuron.domain.product.valueobject.ProductCategory;

public class Product {

	private Integer id;
	private String name;
	private String code;
	private Integer productCategoryId;
	private Integer serialNumber;
	private Integer formulaId;
	private String description;
	
	private ProductCategory category;
	private Formula formula;
	private List<ManufacturingProcess> manufacturingProcesses;
	private List<Operation> operations;
	private List<OperationType> operationTypes;

	//private static final Logger LOGGER = LoggerFactory.getLogger("Product");

	public void addProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.addProduct(this);
	}

	public void updateProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.updateProduct(this);
	}
	
	public void deleteProduct(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteProduct(this);
	}
	
	public void init(ProductRepository productRepository) throws RepositoryException{
		
		formula = productRepository.getFormulaById(formulaId);
		if(formula != null){
			formula.init(productRepository);
		}
		
		operations = productRepository.getOperationList();
		manufacturingProcesses = productRepository.getProcessList(id);
		operationTypes = productRepository.getOperationTypeList();
		
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

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
	}

	public Formula getFormula() {
		return formula;
	}

	public void setFormula(Formula formula) {
		this.formula = formula;
	}

	public List<ManufacturingProcess> getManufacturingProcesses() {
		return manufacturingProcesses;
	}

	public void setManufacturingProcesses(List<ManufacturingProcess> manufacturingProcesses) {
		this.manufacturingProcesses = manufacturingProcesses;
	}

	public List<Operation> getOperations() {
		return operations;
	}

	public void setOperations(List<Operation> operations) {
		this.operations = operations;
	}

	public List<OperationType> getOperationTypes() {
		return operationTypes;
	}

	public void setOperationTypes(List<OperationType> operationTypes) {
		this.operationTypes = operationTypes;
	}
	
	
}
