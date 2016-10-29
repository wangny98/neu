package com.ineuron.resources.user;

import com.codahale.metrics.annotation.Timed;

import com.ineuron.api.user.*;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@Path("/register")
@Produces(MediaType.APPLICATION_JSON)
public class RegisterResource {
	private final String text;
    private final String defaultName;
    
    public RegisterResource(String text, String defaultName) 
    {
    	this.text = text;
        this.defaultName = defaultName;
    };

    @GET
    @Timed
    public UserRegister signup(@QueryParam("username") Optional<String> username,@QueryParam("lastname") Optional<String> lastname,@QueryParam("firstname") Optional<String> firstname,@QueryParam("password") Optional<String> password,@QueryParam("role") Optional<String> role) {
        final String usernameValue = String.format(text, username.orElse(defaultName));
        final String lastnameValue = String.format(text, lastname.orElse(defaultName));
        final String firstnameValue = String.format(text, firstname.orElse(defaultName));
        final String passwordValue = String.format(text, password.orElse(defaultName));
        final String roleValue = String.format(text, role.orElse(defaultName));
        
        return new UserRegister(usernameValue,lastnameValue,firstnameValue,passwordValue,roleValue);
    }
}

