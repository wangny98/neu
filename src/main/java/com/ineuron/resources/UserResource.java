package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.InvalidAPITokenException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityService;
import com.ineuron.domain.user.service.UserService;
import com.ineuron.domain.user.valueobject.Role;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON+ ";charset=UTF-8") 
public class UserResource {

	@Inject
	private UserService userService;
	
	@Inject
	private SecurityService securityService;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserResource.class);

	public UserResource() {
		super();
	}
	
	@Path("/validateloginstatus")
	@GET
	@Timed
	public INeuronResponse validateLoginStatus(@Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			if(response.getApiToken() != null){
				response.setSuccess(true);
			}
			LOGGER.info("user/validateloginstatus newApiToken=" + response.getApiToken());
		} catch (Exception e) {
			response = new INeuronResponse();
		}
		return response;
	}

	@Path("/authenticate")
	@POST
	@Timed
	public INeuronResponse login(final User user, @Context final UriInfo uriInfo) {
		System.out.println("LOGGER.isDebugEnabled() = " + LOGGER.isDebugEnabled());
		INeuronResponse response = new INeuronResponse();
		try {
			User foundUser=userService.doAuthenticate(user);
			if(foundUser!=null){
				String apiToken = securityService.createApiToken(user.getUsername());
				LOGGER.info("user/authenticate newApiToken=" + apiToken);
				response.setSuccess(true);
				response.setValue(foundUser);
				response.setApiToken(apiToken);
			}
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}

	@Path("/register")
	@POST
	@Timed
	public INeuronResponse signup(final User user, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.doRegister(user);
			response.setSuccess(true);
			response.setValue(null);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}

	@Path("/update")
	@POST
	@Timed
	public INeuronResponse update(final User user, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			LOGGER.info("user/update newApiToken=" + response.getApiToken());
			userService.updateUser(user);			
			response.setSuccess(true);
			response.setValue(user);
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
	public INeuronResponse delete(final User user, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
			
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			LOGGER.info("user/delete newApiToken=" + response.getApiToken());
				userService.deleteUser(user);			
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
	public INeuronResponse getUserList(@Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, debug); 
			LOGGER.info("user/list newApiToken=" + response.getApiToken());
			List<User> users = userService.getUserList();
			response.setValue(users);
			response.setSuccess(true);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (InvalidAPITokenException e) {
			LOGGER.error(e.getMessage(), e);
			response = new INeuronResponse();
			response.setMessage(e.getMessage());
		}
		return response;
	}
	

	@Path("/user")
	@GET
	@Timed
	public INeuronResponse getUserByUsername(@QueryParam("username") String username, @Context HttpHeaders httpHeader, @QueryParam("debug") boolean debug) {
		INeuronResponse response = null;
		LOGGER.info("in userResource: getUserByUsername. username:" + username);
		try {
			response = new INeuronResponse(securityService, httpHeader, debug); 
			LOGGER.info("user/user newApiToken=" + response.getApiToken());
			User user=userService.getUserByUsername(username);			
			response.setValue(user);
			response.setSuccess(true);
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		} catch (INeuronException e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		} catch (InvalidAPITokenException e) {
			LOGGER.error(e.getMessage(), e);
			response = new INeuronResponse();
			response.setMessage(e.getMessage());
		}
		return response;
	}

	
	@Path("/createrole")
	@POST
	@Timed
	public INeuronResponse createRole(final Role role, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			LOGGER.info("user/createrole newApiToken=" + response.getApiToken());
			userService.createRole(role);
			response.setValue(role);
			response.setSuccess(true);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (InvalidAPITokenException e) {
			response = new INeuronResponse();
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
	@Path("/updaterole")
	@POST
	@Timed
	public INeuronResponse updateRole(final Role role, @Context final UriInfo uriInfo,  @Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			LOGGER.info("user/updaterole newApiToken=" + response.getApiToken());
			userService.updateRole(role);			
			response.setValue(role);
			response.setSuccess(true);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (InvalidAPITokenException e) {
			LOGGER.error(e.getMessage(), e);
			response = new INeuronResponse();
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
	@Path("/deleterole")
	@POST
	@Timed
	public INeuronResponse deleteRole(final Role role, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			userService.deleteRole(role);			
			response.setSuccess(true);
			response.setValue(role);
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (InvalidAPITokenException e) {
			LOGGER.error(e.getMessage(), e);
			response = new INeuronResponse();
			response.setMessage(e.getMessage());
		} 
		return response;

	}
	
	@Path("/rolelist")
	@GET
	@Timed
	public INeuronResponse getRoleList(@Context HttpHeaders httpHeader) {
		INeuronResponse response = null;
		try {
			response = new INeuronResponse(securityService, httpHeader, false); 
			List<Role> roles = userService.getRoleList();
			response.setValue(roles);
			response.setSuccess(true);		
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (INeuronException e) {
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
