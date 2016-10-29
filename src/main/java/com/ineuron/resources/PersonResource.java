package com.ineuron.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ineuron.view.Person;
import com.ineuron.view.PersonView;

@Path("/people")
@Produces(MediaType.TEXT_HTML)
public class PersonResource {

    @GET
    public PersonView getPerson() {
    	Person person = new Person();
    	person.setName("haha");
    	
        return new PersonView(person);
    }
}
