package com.ineuron.api.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ineuron.domain.user.repository.*;
import com.ineuron.domain.user.entity.*;


public class UserRegister {
	private User user;
	private String message;

	
    public UserRegister() {
        // Jackson deserialization
    }

    public UserRegister(User user) {
      
    	UserRepository userRep=new UserRepository();
    	
        String[] userResponse=userRep.DoRegistter(user);
        
        this.message=userResponse[0];
        //this.use=userResponse[1];
        
       }

    @JsonProperty
    public String getMessage() {
        return message;
    }
    
    @JsonProperty
    public User getUser() {
        return user;
    }
}
