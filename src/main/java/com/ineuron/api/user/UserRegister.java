package com.ineuron.api.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ineuron.domain.user.respository.*;


public class UserRegister {
	private String message;
	private String username;
	
    public UserRegister() {
        // Jackson deserialization
    }

    public UserRegister(String username, String lastname, String firstname, String password, String role) {
      
    	UserRepository userRep=new UserRepository();
    	
        String[] userResponse=userRep.DoRegistter(username, lastname, firstname, password, role);
        
        this.message=userResponse[0];
        this.username=userResponse[1];
        
       }

    @JsonProperty
    public String getMessage() {
        return message;
    }
    
    @JsonProperty
    public String getUsername() {
        return username;
    }
}
