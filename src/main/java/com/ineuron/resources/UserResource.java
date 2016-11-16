package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.dataformat.yaml.snakeyaml.util.UriEncoder;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityService;
import com.ineuron.domain.user.service.UserService;
import com.ineuron.domain.user.valueobject.Function;
import com.ineuron.domain.user.valueobject.Operation;
import com.ineuron.domain.user.valueobject.Role;

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
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
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
			response.setValue(user);
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
		INeuronResponse response = new INeuronResponse();
			
		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);		
			LOGGER.info("user/update newApiToken=" + newApiToken);
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
	
	@Path("/delete")
	@POST
	@Timed
	public INeuronResponse delete(final User user, @Context final UriInfo uriInfo, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
			
		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);		
			LOGGER.info("user/delete newApiToken=" + newApiToken);
			if(newApiToken != null){
				userService.deleteUser(user);			
				response.setSuccess(true);
				response.setApiToken(newApiToken);
				response.setValue(null);
			}
			
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return response;
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
	
	@Path("/testlist")
	@GET
	@Timed
	public INeuronResponse getTestUserList() {
		LOGGER.info("user/testlist");
		List<User> users = null;
		INeuronResponse response = new INeuronResponse();
		try {
				users = userService.getUserList();
				LOGGER.info("users.size() = " + users.size());
				response.setValue(users);
				response.setSuccess(true);
				
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return response;
	}

	@Path("/user")
	@POST
	@Timed
	public INeuronResponse getUserByUsername(final String username, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		
		System.out.println("in userResource: getUserByUsername. username:"
				+ username);
		try {
			//String newApiToken = validateAndUpdateApiToken(httpHeader);
			//LOGGER.info("user/user newApiToken=" + newApiToken);
			//if(newApiToken != null){
				User user=userService.getUserByUsername(username);			
				response.setSuccess(true);
				//response.setApiToken(newApiToken);
				response.setValue(user);
			//}
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		} catch (Exception e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		}
		return response;
	}

	@Path("/testuser")
	@GET
	@Timed
	public INeuronResponse getUserByUsername1(@QueryParam("username") String username, @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		
		try {
				User user=userService.getUserByUsername(username);			
				response.setSuccess(true);
				response.setValue(user);
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		} catch (Exception e) {
			response.setMessage(e.getMessage());
			LOGGER.error(e.getMessage(), e);
		}
		return response;
	}
	
	@Path("/createrole")
	@POST
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
		} catch (INeuronException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		}
		return response;

	}
	
	@Path("/updaterole")
	@POST
	@Timed
	public INeuronResponse updateRole(final Role role, @Context final UriInfo uriInfo,  @Context HttpHeaders httpHeader) {
		INeuronResponse response = new INeuronResponse();
		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);
			LOGGER.info("user/updaterole newApiToken=" + newApiToken);
			if(newApiToken != null){
				userService.updateRole(role);			
				response.setSuccess(true);
				response.setValue(role);
				response.setApiToken(newApiToken);
			}
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
	
	@Path("/deleterole")
	@POST
	@Timed
	public INeuronResponse deleteRole(final Role role, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.deleteRole(role);			
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
	public INeuronResponse getRoleList(@Context HttpHeaders httpHeader) {

		INeuronResponse response = new INeuronResponse();

		try {
			String newApiToken = validateAndUpdateApiToken(httpHeader);
			List<Role> roles = userService.getRoleList();
			response.setValue(roles);
			response.setSuccess(true);		
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
	
	@Path("/rolelist1")
	@GET
	@Timed
	public INeuronResponse getRoleList1(@Context HttpHeaders httpHeader) {

		INeuronResponse response = new INeuronResponse();

		try {
			List<Role> roles = userService.getRoleList();
			response.setValue(roles);
			response.setSuccess(true);		
		} catch (RepositoryException e) {
			LOGGER.error(e.getMessage(), e);
			response.setMessage(e.getMessage());
		} catch (Exception e) {
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
	

	@Path("/funcbyindex")
	@GET
	@Timed
	public INeuronResponse getFuncByIndex(Integer index) {
		
		INeuronResponse response = new INeuronResponse();
		String functionName="";
		
		functionName=Function.getName(index);
		response.setSuccess(true);
		response.setValue(functionName);
		return response;
	}
	

	@Path("/operationlist")
	@GET
	@Timed
	public INeuronResponse getOperationList() {
		
		INeuronResponse response = new INeuronResponse();
	
		response.setSuccess(true);
		response.setValue(Operation.values());
		return response;
	}
	
	@Path("/operationbyindex")
	@GET
	@Timed
	public INeuronResponse getOperationByIndex(Integer index) {
		
		INeuronResponse response = new INeuronResponse();
	
		response.setSuccess(true);
		response.setValue(Operation.getName(index));
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

}
