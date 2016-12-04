package com.ineuron.domain.product.valueobject;

public class FormulaMaterial {
	
	private Integer id;
	private Integer formulaId;
	private Integer materialId;
	private Integer materialQuantity;

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getFormulaId() {
		return formulaId;
	}
	public void setFormulaId(Integer formulaId) {
		this.formulaId = formulaId;
	}
	public Integer getMaterialId() {
		return materialId;
	}
	public void setMaterialId(Integer materialId) {
		this.materialId = materialId;
	}
	public Integer getMaterialQuantity() {
		return materialQuantity;
	}
	public void setMaterialQuantity(Integer materialQuantity) {
		this.materialQuantity = materialQuantity;
	}

}
