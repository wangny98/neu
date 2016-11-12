package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.dataformat.yaml.snakeyaml.util.UriEncoder;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.Role;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityService;
import com.ineuron.domain.user.service.UserService;
import com.ineuron.domain.user.valueobject.Function;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

	@Inject
	private UserService userService;
	
	@Inject
	private SecurityService securityService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

	public UserResource() {
		super();
	}

	@Path("/authenticate")
	@POST
	@Timed
	public INeuronResponse login(final User user, @Context final UriInfo uriInfo) {
		System.out.println("LOGGER.isDebugEnabled() = " + LOGGER.isDebugEnabled());
		INeuronResponse response = new INeuronResponse();
		try {
			userService.doAuthenticate(user);
			String apiToken = securityService.createApiToken(user.getUsername());
			LOGGER.info("user/authenticate newApiToken=" + apiToken);
			response.setSuccess(true);
			response.setValue(user);
			response.setApiToken(apiToken);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return response;

	}

	@Path("/register")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse signup(final User user, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.doRegister(user);
			response.setSuccess(true);
			response.setValue(user);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}

	@Path("/update")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse update(final User user, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
			
		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);		
			LOGGER.info("user/list newApiToken=" + newApiToken);
			if(newApiToken != null){
				userService.updateUser(user);			
				response.setSuccess(true);
				response.setApiToken(newApiToken);
				response.setValue(user);
			}
			
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return response;
	}

	private String validateAndUpdateApiToken(HttpHeaders httpHeader) throws Exception {
		Map<String, Cookie> cookies = httpHeader.getCookies();
		
		Cookie apiTokenCookie = cookies.get("INeuron-ApiToken");
		Cookie usernameCookie = cookies.get("INeuron-UserName");
		
		String apiToken = apiTokenCookie.getValue();
		apiToken = UriEncoder.decode(apiToken);
		String username = usernameCookie.getValue();
		LOGGER.info("user/update apiToken=" + apiToken);
		LOGGER.info("user/update userName=" + username);
		
		return securityService.validateAndUpdateApiToken(apiToken, username);
	}

	@Path("/list")
	@GET
	@Timed
	public INeuronResponse getUserList(@Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);	
			LOGGER.info("user/list newApiToken=" + newApiToken);
			if(newApiToken != null){
				List<User> users = userService.getUserList();
				response.setValue(users);
				response.setSuccess(true);
				response.setApiToken(newApiToken);
			}
			
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (UnsupportedEncodingException e) {
			LOGGER.error(e.getMessage(), e);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return response;
	}

	@Path("/createrole")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse createRole(final Role role, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.createRole(role);
			response.setSuccess(true);
			response.setValue(role);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
	@Path("/updaterole")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse updateRole(final Role role, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.updateRole(role);			
			response.setSuccess(true);
			response.setValue(role);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
	@Path("/rolelist")
	@GET
	@Timed
	public INeuronResponse getRoleList() {

		INeuronResponse response = new INeuronResponse();

		try {
			List<Role> roles = userService.getRoleList();
			response.setValue(roles);
			response.setSuccess(true);			
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}

	@Path("/funclist")
	@GET
	@Timed
	public INeuronResponse getFuncList() {
		
		INeuronResponse response = new INeuronResponse();
		
		Map<Integer, String> functions = new TreeMap<Integer, String>();

		for (Function f : Function.values()){
			functions.put(f.getIndex(), f.getName());
		}
		response.setSuccess(true);
		response.setValue(functions);
		return response;
	}

}
