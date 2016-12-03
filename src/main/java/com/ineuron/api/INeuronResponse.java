package com.ineuron.api;

import javax.ws.rs.core.HttpHeaders;

import com.ineuron.domain.user.service.SecurityService;

public class INeuronResponse {
	
	boolean success = false;
	String message;
	String apiToken;
	Object value;
	
	public INeuronResponse(){}
	
	public INeuronResponse(SecurityService securityService, HttpHeaders httpHeader, boolean isDebug){
		apiToken = securityService.validateAndUpdateApiToken(httpHeader, isDebug);
	}
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getApiToken() {
		return apiToken;
	}
	public void setApiToken(String apiToken) {
		this.apiToken = apiToken;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	
	

}
