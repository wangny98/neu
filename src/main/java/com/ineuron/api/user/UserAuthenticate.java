package com.ineuron.api.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ineuron.domain.user.repository.*;;


public class UserAuthenticate {
	private String message;
	private String username;
    private String firstname;
    private String lastname;
    private String role;


    public UserAuthenticate() {
        // Jackson deserialization
    }

    public UserAuthenticate(String username, String password) {
      
    	UserRepository userRep=new UserRepository();
    	
        String[] userResponse=userRep.DoAuthenticate(username, password);
        
        this.message=userResponse[0];
        this.username=userResponse[1];
        this.firstname=userResponse[2];
        this.lastname=userResponse[3];
        this.role=userResponse[4];
		
       }

    @JsonProperty
    public String getMessage() {
        return message;
    }
    
    @JsonProperty
    public String getUsername() {
        return username;
    }

    @JsonProperty
    public String getFirstname() {
        return firstname;
    }
    
    @JsonProperty
    public String getLastname() {
        return lastname;
    }
    
    @JsonProperty
    public String getRole() {
        return role;
    }     
}
