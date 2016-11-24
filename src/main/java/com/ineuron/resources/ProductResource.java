package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.dataformat.yaml.snakeyaml.util.UriEncoder;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.product.entity.Product;
import com.ineuron.domain.product.service.ProductService;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityService;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

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
