package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.Role;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.UserService;
import com.ineuron.domain.user.valueobject.Function;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

	@Inject
	private UserService userService;

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
			response.setSuccess(true);
			response.setValue(user);
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

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
	public INeuronResponse update(final User user, @Context final UriInfo uriInfo) {
		INeuronResponse response = new INeuronResponse();
		try {
			userService.updateUser(user);			
			response.setSuccess(true);
			response.setValue(user);
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

	}

	@Path("/list")
	@GET
	@Timed
	public INeuronResponse getUserList() {
		INeuronResponse response = new INeuronResponse();

		try {
			List<User> users = userService.getUserList();
			response.setValue(users);
			response.setSuccess(true);
			return response;
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}

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

}
