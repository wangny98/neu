package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.InvalidAPITokenException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.entity.Formula;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.valueobject.ProductCategory;
import com.ineuron.domain.product.valueobject.AttributeCategory;
import com.ineuron.domain.product.valueobject.Attribute;
import com.ineuron.domain.product.valueobject.FormulaMaterial;
import com.ineuron.domain.product.valueobject.ManufacturingProcess;
import com.ineuron.domain.product.valueobject.Material;
import com.ineuron.domain.user.valueobject.Operation;
import com.ineuron.domain.product.service.ProductService;
import com.ineuron.domain.user.service.SecurityService;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Path("/product")
@Produces(MediaType.APPLICATION_JSON+ ";charset=UTF-8") 
public class ProductResource {

	@Inject
	private ProductService productService;
	
	@Inject
	private SecurityService securityService;
		
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductResource.class);

	public ProductResource() {
		super();
	}

@Path("/createproductcategory")
@POST
@Timed
public INeuronResponse createProductCategory(final ProductCategory productCategory, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.createProductCategory(productCategory);
		response.setValue(productCategory);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}
	
@Path("/create")
@POST
@Timed
public INeuronResponse createProduct(final Product product, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.createProduct(product);
		response.setValue(product);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/delete")
@POST
@Timed
public INeuronResponse deleteProduct(final Product product, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.deleteProduct(product);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/update")
@POST
@Timed
public INeuronResponse updateProduct(final Product product, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.updateProduct(product);
		response.setValue(product);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}



@Path("/list")
@GET
@Timed
public INeuronResponse productList( @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		List<Product> products = productService.getProductList();
		response.setValue(products);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/attributecategorylist")
@GET
@Timed
public INeuronResponse attributeCategoryList(@Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		List<AttributeCategory> attributeCategories =productService.getAttributeCategoryList();
		response.setValue(attributeCategories);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/attributelist")
@GET
@Timed
public INeuronResponse attributeList(@Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		List<Attribute> attributes =productService.getAttributeList();
		response.setValue(attributes);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/attributesbycategoryid")
@POST
@Timed
public INeuronResponse attributesByCategoryId(final Integer attributeCategoryId, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		List<Attribute> attributes =productService.getAttributesByCategoryId(attributeCategoryId);
		response.setValue(attributes);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/createattribute")
@POST
@Timed
public INeuronResponse createAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.createAttribute(attribute);
		response.setValue(attribute);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/updateattribute")
@POST
@Timed
public INeuronResponse updateAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.updateAttribute(attribute);
		response.setValue(attribute);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/deleteattribute")
@POST
@Timed
public INeuronResponse deleteAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		productService.deleteAttribute(attribute);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/manufacturing")
@GET
@Timed
public INeuronResponse manufacturing(@QueryParam("id") Integer id, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		List<ManufacturingProcess> processes = productService.getProcessList(id);
		response.setValue(processes);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/saveprocesses")
@POST
@Timed
public INeuronResponse saveProcesses(final List<ManufacturingProcess> processes, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		productService.saveProcesses(processes);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}



@Path("/operations")
@GET
@Timed
public INeuronResponse operations(@Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		List<Operation> operations = productService.getOperations();
		response.setValue(operations);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}


@Path("/materials")
@GET
@Timed
public INeuronResponse materials(@Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, false); 
		List<Material> materials = productService.getMaterials();
		response.setValue(materials);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/formulas")
@GET
@Timed
public INeuronResponse formulas(@Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		List<Formula> formulas = productService.getFormulas();
		response.setValue(formulas);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/formulamaterials")
@GET
@Timed
public INeuronResponse formulaMaterials(@QueryParam("id") int formulaId, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		List<FormulaMaterial> materials = productService.getFormulaMaterials(formulaId);
		response.setValue(materials);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/createformula")
@POST
@Timed
public INeuronResponse createFormula(final Formula formula, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		productService.addFormula(formula);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/updateformula")
@POST
@Timed
public INeuronResponse updateFormula(final Formula formula, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	LOGGER.info("updateformula:" + formula);
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		productService.updateFormula(formula);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

@Path("/deleteformula")
@POST
@Timed
public INeuronResponse deleteFormula(@QueryParam("id") int id, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
	LOGGER.info("deleteformula:" + id);
	INeuronResponse response = null;
	try {
		response = new INeuronResponse(securityService, httpHeader, debug); 
		productService.deleteFormula(id);
		response.setSuccess(true);
	} catch (RepositoryException e) {
		LOGGER.error(e.getMessage(), e);
		response.setMessage(e.getMessage());
	} catch (InvalidAPITokenException e) {
		LOGGER.error(e.getMessage(), e);
		response = new INeuronResponse();
		response.setMessage(e.getMessage());
	}
	return response;
}

}
