package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.ineuron.api.INeuronResponse;
import com.ineuron.api.user.*;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.UserService;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import java.util.Optional;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
	private final String text;
    private final String defaultName;
    
    public UserResource(String text, String defaultName) 
    {
    	this.text = text;
        this.defaultName = defaultName;
    };

    @Path("/authenticate")
    @GET
    @Timed
    public UserAuthenticate login(@QueryParam("username") Optional<String> username,@QueryParam("password") Optional<String> password) {
        final String usernameValue = String.format(text, username.orElse(defaultName));
        final String passwordValue = String.format(text, password.orElse(defaultName));
        
        return new UserAuthenticate(usernameValue, passwordValue);
    }
    
    @Path("/register")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Timed
    public INeuronResponse signup(final User user, @Context final UriInfo uriInfo) {
    	INeuronResponse response = new INeuronResponse();
    	
    	UserService service = new UserService();
    	try {
			service.doRegister(user);
		} catch (RepositoryException e) {
			response.setMessage(e.getMessage());
			response.setSuccess(false);
			return response;
		}
    	response.setMessage("success");
		response.setSuccess(true);
		response.setValue(user);
		return response;

    }
}

