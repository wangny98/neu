package com.ineuron.resources;

import com.codahale.metrics.annotation.Timed;

import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.service.SecurityManagementService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import java.util.List;
import java.util.Optional;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @GET
    @Timed
    public List<User> sayHello(@QueryParam("name") Optional<String> name) {
        
    	SecurityManagementService service = new SecurityManagementService();
        return service.getUserList();
    }
}

