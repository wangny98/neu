package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.Role;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityService;
import com.ineuron.domain.user.service.UserService;
import com.ineuron.domain.user.valueobject.Function;
import com.ineuron.domain.user.valueobject.Permission;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
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

	public UserResource() {
		super();
	}

	@Path("/authenticate")
	@POST
	@Timed
	public INeuronResponse login(final User user, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.doAuthenticate(user);
			String apiToken = securityService.createApiToken(user.getUsername());
			response.setSuccess(true);
			response.setValue(user);
			response.setApiToken(apiToken);
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
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
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

	}

	@Path("/update")
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse update(final User user, @Context final UriInfo uriInfo, @Context HttpHeaders hh) {
		INeuronResponse response = new INeuronResponse();
		String apiToken = hh.getHeaderString("apiToken");
		String username = hh.getHeaderString("username");
		System.out.println("apiToken=" + apiToken);
		System.out.println("userName=" + username);
		
		try {
			apiToken = URLDecoder.decode(apiToken, "UTF-8");
			String newApiToken = securityService.validateAndUpdateApiToken(apiToken, username);
			//if(newApiToken != null){
				userService.updateUser(user);			
				response.setSuccess(true);
				response.setApiToken(newApiToken);
				response.setValue(user);
			//}
			
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}

	@Path("/list")
	@GET
	@Timed
	public INeuronResponse getUserList(@Context HttpHeaders hh) {
		INeuronResponse response = new INeuronResponse();
		String apiToken = hh.getHeaderString("apiToken");
		String username = hh.getHeaderString("username");
		System.out.println("apiToken=" + apiToken);
		System.out.println("userName=" + username);
		try {
			apiToken = URLDecoder.decode(apiToken, "UTF-8");
			String newApiToken = securityService.validateAndUpdateApiToken(apiToken, username);
			if(newApiToken != null){
				List<User> users = userService.getUserList();
				response.setValue(users);
				response.setSuccess(true);
				response.setApiToken(newApiToken);
			}
			
			
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return response;
	}

	@Path("/user")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Timed
	public INeuronResponse getUserByUsername(@Context HttpHeaders hh) {
		INeuronResponse response = new INeuronResponse();
		String apiToken = hh.getHeaderString("apiToken");
		String username = hh.getHeaderString("username");
		System.out.println("apiToken=" + apiToken);
		System.out.println("userName=" + username);
		System.out.println("in getuserbyname.");
		try {
			apiToken = URLDecoder.decode(apiToken, "UTF-8");
			String newApiToken = securityService.validateAndUpdateApiToken(apiToken, username);
			//if(newApiToken != null){
				User user=userService.getUserByUsername(username);			
				response.setSuccess(true);
				response.setApiToken(newApiToken);
				response.setValue(user);
				System.out.println("success in get userbyname" + user.getRole());
			//}
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			System.out.println(response);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
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
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

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
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

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
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

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
	

	@Path("/permissionlist")
	@GET
	@Timed
	public INeuronResponse getPermissionList() {
		
		INeuronResponse response = new INeuronResponse();
		
		Map<Integer, String> permissions = new TreeMap<Integer, String>();

		for (Permission f : Permission.values()){
			permissions.put(f.getIndex(), f.getName());
		}
		response.setSuccess(true);
		response.setValue(permissions);
		return response;
	}
	
	@Path("/permissionbyindex")
	@GET
	@Timed
	public INeuronResponse getPermissionByIndex(Integer index) {
		
		INeuronResponse response = new INeuronResponse();
		String permissionName="";
		
		permissionName=Permission.getName(index);
		response.setSuccess(true);
		response.setValue(permissionName);
		return response;
	}
	

}
