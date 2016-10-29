package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;
import com.ineuron.api.user.*;
import com.ineuron.domain.user.entity.User;

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
    public void signup(final User user, @Context final UriInfo uriInfo) {
        System.out.println(user.getUsername());
       // return new UserRegister();
    }
}

