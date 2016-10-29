package com.ineuron.resources.user;

import com.codahale.metrics.annotation.Timed;

import com.ineuron.api.user.*;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/authenticate")
@Produces(MediaType.APPLICATION_JSON)
public class AuthenticateResource {
	private final String text;
    private final String defaultName;
    
    public AuthenticateResource(String text, String defaultName) 
    {
    	this.text = text;
        this.defaultName = defaultName;
    };

    @GET
    @Timed
    public UserAuthenticate login(@QueryParam("username") Optional<String> username,@QueryParam("password") Optional<String> password) {
        final String usernameValue = String.format(text, username.orElse(defaultName));
        final String passwordValue = String.format(text, password.orElse(defaultName));
        
        return new UserAuthenticate(usernameValue, passwordValue);
    }
}

