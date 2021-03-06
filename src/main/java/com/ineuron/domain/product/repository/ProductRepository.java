package com.ineuron.domain.product.repository;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.dataaccess.db.INeuronDBConnection;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.entity.Formula;
import com.ineuron.domain.product.valueobject.AttributeCategory;
import com.ineuron.domain.product.valueobject.ProductCategory;
import com.ineuron.domain.product.valueobject.Attribute;
import com.ineuron.domain.product.valueobject.FormulaMaterial;
import com.ineuron.domain.product.valueobject.ManufacturingProcess;
import com.ineuron.domain.product.valueobject.Material;
import com.ineuron.domain.product.valueobject.OperationType;
import com.ineuron.domain.product.valueobject.Operation;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductRepository {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(ProductRepository.class);

	public ProductRepository() {

	}

	public void addProductCategory(ProductCategory productCategory) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("productCategory: "+productCategory.getName());
			session.insert("addProductCategory", productCategory);
			session.commit();
			//System.out.println("success to insert productcategory!");
		} finally {
			session.close();
		}
	}
	
	public List<ProductCategory> getProductCategoryList() throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<ProductCategory> productCategories = session.selectList("getProductCategories");
			return productCategories;
		} finally {
			session.close();
		}
	}
	
	public ProductCategory getProductCategoryByName(String name) throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			ProductCategory productCategory = session.selectOne("getProductCategoryByName", name);
			return productCategory;
		} finally {
			session.close();
		}
	}
	
	public ProductCategory getProductCategoryByCode(String code) throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("pc code: "+code);
			ProductCategory productCategory = session.selectOne("getProductCategoryByCode", code);
			return productCategory;
		} finally {
			session.close();
		}
	}
	
	
	public void updateProductCategory(ProductCategory productCategory) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("productCategory: "+productCategory.getName());
			session.update("updateProductCategory", productCategory);
			session.commit();
			//System.out.println("success to insert productcategory!");
		} finally {
			session.close();
		}
	}
	
	public void addProduct(Product product) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			int productSN=0;
			Product p=session.selectOne("getMaxProductSNByCategoryId", product.getProductCategoryId());
			if(p!=null) productSN=p.getSerialNumber()+1;
			else productSN=1;
			product.setSerialNumber(productSN);
			//System.out.println("productSN: "+productSN);
			String productCode=product.getCode()+"-"+String.format("%03d", productSN);
			product.setCode(productCode);
			
			System.out.println("product code: "+productCode);
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
	
	public List<Product> getProductListByCategory(Integer productCategoryId) throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("pc id: "+productCategoryId);
			List<Product> products = session.selectList("getProductByCategory", productCategoryId);
			System.out.println("pc : "+products.get(0).getName());
			return products;
		} finally {
			session.close();
		}
	}
	
	public Product getProductByName(String name) throws RepositoryException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("pc id: "+productCategoryId);
			Product products = session.selectOne("getProductByName", name);
			//System.out.println("pc : "+products.get(0).getName());
			return products;
		} finally {
			session.close();
		}
	}
	
	public void addAttribute(Attribute attribute) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("attribute: "+attribute.getName());
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
			System.out.println("attribute: "+attribute.getName());
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
			System.out.println("attribute: "+attribute.getName());
			session.update("deleteAttribute", attribute);
			session.commit();
			System.out.println("delete attribute by using mybatis!");
		} finally {
			session.close();
		}
	}


	public List<Attribute> getAttributeList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			System.out.println("getAttributes: ");
			List<Attribute> attributes = session.selectList("getAttributes");			
			return attributes;
		} finally {
			session.close();
		}
	}
	
	public List<Attribute> getAttributesByCategoryId(Integer attributeCategoryId) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("categoryid: "+attributeCategoryId);
			List<Attribute> attributes = session.selectList("getAttributesByCategoryId", attributeCategoryId);
			//System.out.println("attributelist size "+attributes.get(0).getAttribute());
			return attributes;
		} finally {
			session.close();
		}
	}
	
	public Attribute getAttributeByName(String name) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			//System.out.println("categoryid: "+attributeCategoryId);
			Attribute attribute = session.selectOne("getAttributeByName", name);
			//System.out.println("attributelist size "+attributes.get(0).getAttribute());
			return attribute;
		} finally {
			session.close();
		}
	}
	
	public List<AttributeCategory> getAttributeCategoryList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<AttributeCategory> attributeCategories = session.selectList("getAttributeCategories");
			return attributeCategories;
		} finally {
			session.close();
		}
	}
	
	public AttributeCategory getAttributeCategoryById(Integer attributeCategoryId) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			AttributeCategory attributeCategory = session.selectOne("getAttributeCategoryById", attributeCategoryId);
			return attributeCategory;
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
	
	public List<Formula> getFormulaList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<Formula> formulas = session.selectList("getFormulas");
			return formulas;
		} finally {
			session.close();
		}
	}

	public Formula getFormulaById(Integer formulaId) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			return session.selectOne("getFormulaById", formulaId);

		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql!", e);
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


	public void addFormula(Formula formula)  throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		
		try{
			if(formula != null){
				session.update("addFormula", formula);
				List<FormulaMaterial> materials = formula.getMaterialSettings();
				if(materials != null && materials.size() > 0){
					for(FormulaMaterial material : materials){
						session.insert("addFormulaMaterial", material);
					}
				}
				session.commit();
			}
			
		} finally {
			session.close();
		}
		
	}


	public void updateFormula(Formula formula) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		
		try{
			if(formula != null){
				session.update("updateFormula", formula);
				session.delete("deleteFormulaMaterial", formula);
				List<FormulaMaterial> materials = formula.getMaterialSettings();
				if(materials != null && materials.size() > 0){
					for(FormulaMaterial material : materials){
						session.insert("addFormulaMaterial", material);
					}
				}
				session.commit();
			}
			
		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql!", e);
		} finally {
			session.close();
		}
		
	}


	public List<FormulaMaterial> getFormulaMaterialList(Formula formula) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<FormulaMaterial> formulaMaterials = session.selectList("getFormulaMaterials", formula);
			return formulaMaterials;
		} finally {
			session.close();
		}
		
	}


	public void deleteFormula(Formula formula) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try{
			if(formula != null){
				session.delete("deleteFormula", formula);
				session.commit();
			}
			
		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql: deleteFormula!", e);
		} finally {
			session.close();
		}
	}

	public Product getProductById(Integer productId) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			return session.selectOne("getProductById", productId);
		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql: getProductById!", e);
		} finally {
			session.close();
		}
	}

	public List<OperationType> getOperationTypeList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			return session.selectList("getOperationTypes");
		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql: getOperationTypeList!", e);
		} finally {
			session.close();
		}
	}

	public List<Material> getMaterialByIds(List<Integer> materialIds) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			return session.selectList("getMaterialByIds", materialIds);
		} catch(RuntimeException e){
			throw new RepositoryException("failed to excute sql: getMaterialByIds!", e);
		} finally {
			session.close();
		}
	}
}
