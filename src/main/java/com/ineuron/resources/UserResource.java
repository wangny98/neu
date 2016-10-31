package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.google.inject.Inject;
import com.ineuron.api.INeuronResponse;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.UserService;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import java.util.List;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    
    @Inject
    private UserService userService;
    
    public UserResource(){
    	super();
    }
    

    @Path("/authenticate")
    @POST
    @Timed
    public INeuronResponse login(final User user, @Context final UriInfo uriInfo) {
    	INeuronResponse response = new INeuronResponse();
    	try {
    		userService.doAuthenticate(user);
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}
    	response.setMessage("success");
		response.setSuccess(true);
		response.setValue(user);
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
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			return response;
		}
    	response.setMessage("success");
		response.setSuccess(true);
		response.setValue(user);
		return response;

    }
    
    @Path("/list")
    @GET
    @Timed
    public List<User> getUserList() {
    	
        return userService.getUserList();
    }
    
}

