package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.valueobject.Attribute;
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


	@Path("/create")
	@POST
	@Timed
	public INeuronResponse createProduct(final Product product, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.createProduct(product);
			response.setSuccess(true);
			response.setValue(product);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	
	@Path("/delete")
	@POST
	@Timed
	public INeuronResponse deleteProduct(final Product product, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.deleteProduct(product);
			response.setSuccess(true);
			response.setValue(null);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	
	@Path("/update")
	@POST
	@Timed
	public INeuronResponse updateProduct(final Product product, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.updateProduct(product);
			response.setSuccess(true);
			response.setValue(product);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	

	@Path("/list")
	@GET
	@Timed
	public INeuronResponse productList( @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);			
			List<Product> products = productService.getProductList();
			response.setSuccess(true);
			response.setValue(products);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	@Path("/attributelist")
	@POST
	@Timed
	public INeuronResponse attributeList(final Integer productid, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			List<Attribute> attributes =productService.getAttributeList(productid);
			response.setSuccess(true);
			response.setValue(attributes);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	
	@Path("/createattribute")
	@POST
	@Timed
	public INeuronResponse createAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.createAttribute(attribute);
			response.setSuccess(true);
			response.setValue(attribute);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	

	@Path("/updateattribute")
	@POST
	@Timed
	public INeuronResponse updateAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.updateAttribute(attribute);
			response.setSuccess(true);
			response.setValue(attribute);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	
	@Path("/deleteattribute")
	@POST
	@Timed
	public INeuronResponse deleteAttribute(final Attribute attribute, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader);	
			productService.deleteAttribute(attribute);
			response.setSuccess(true);
			response.setValue(null);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	

	@Path("/manufacturing")
	@GET
	@Timed
	public INeuronResponse manufacturing(@QueryParam("id") Integer id, @Context HttpHeaders httpHeader, @QueryParam("debug") Boolean debug) {
		System.out.println("productId = " + id);
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader, debug);			
			List<ManufacturingProcess> processes = productService.getProcessList(id);
			response.setSuccess(true);
			response.setValue(processes);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	
	
	@Path("/saveprocesses")
	@POST
	@Timed
	public INeuronResponse saveProcesses(final List<ManufacturingProcess> processes, @Context HttpHeaders httpHeader, @QueryParam("debug") Boolean debug) {
		
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader, debug);			
			productService.saveProcesses(processes);
			response.setSuccess(true);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	

	
	@Path("/operations")
	@GET
	@Timed
	public INeuronResponse operations(@Context HttpHeaders httpHeader, @QueryParam("debug") Boolean debug) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader, debug);			
			List<Operation> operations = productService.getOperations();
			response.setSuccess(true);
			response.setValue(operations);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;
	}
	

	
	@Path("/materials")
	@GET
	@Timed
	public INeuronResponse materials(@Context HttpHeaders httpHeader, @QueryParam("debug") Boolean debug) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = securityService.validateAndUpdateApiToken(httpHeader, debug);			
			List<Material> processes = productService.getMaterials();
			response.setSuccess(true);
			response.setValue(processes);
			response.setApiToken(newApiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
}
