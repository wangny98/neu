package com.ineuron.domain.product.entity;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.repository.ProductRepository;
import com.ineuron.domain.product.valueobject.FormulaMaterial;

public class Formula {
	
	private Integer id;
	private String name;
	private String description;
	private List<FormulaMaterial> materials;
	
	private static final Logger LOGGER = LoggerFactory.getLogger("Product");
	
	public void addFormula(ProductRepository productRepository) throws RepositoryException{
		productRepository.addFormula(this);
	}
	
	public void updateFormula(ProductRepository productRepository) throws RepositoryException{
		productRepository.updateFormula(this);
	}
	
	public void deleteFormula(ProductRepository productRepository) throws RepositoryException {
		productRepository.deleteFormula(this);
		
	}
	
	
	
	public List<FormulaMaterial> getMaterials(ProductRepository productRepository) throws RepositoryException {
		if(materials == null){
			materials = productRepository.getFormulaMaterialList(this);
		}
		return materials;
	}
	
	@Override
	public String toString(){
		StringBuilder formulaStr = new StringBuilder();
		formulaStr.append("id=").append(id).append(";")
		.append("name=").append(name).append(";")
		.append("description=").append(description).append("||");
		if(materials != null){
			for(FormulaMaterial material : materials){
				formulaStr.append("materialId=").append(material.getMaterialId()).append(";")
				.append("materialQuantity=").append(material.getMaterialQuantity()).append("||");
			}
		}
		
		return formulaStr.toString();
		
	}
	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	public List<FormulaMaterial> getMaterials() {
		return materials;
	}

	public void setMaterials(List<FormulaMaterial> materials) {
		this.materials = materials;
	}


}
