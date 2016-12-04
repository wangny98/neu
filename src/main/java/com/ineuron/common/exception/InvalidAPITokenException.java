package com.ineuron.common.exception;

public class InvalidAPITokenException  extends Exception{

private static final long serialVersionUID = 1L;
	
	private String message;
	
	Throwable e;
	
	public InvalidAPITokenException(String message, Throwable e){
		this.setMessage(message);
		this.e = e;
	}

	public Throwable getRootCause(){
		return e;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
