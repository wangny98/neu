package com.ineuron.common.exception;

public class RepositoryException extends Exception{
	
	private String message;
	Throwable e;
	
	public RepositoryException(String message, Throwable e){
		this.message = message;
		this.e = e;
	}

	public Throwable getRootCause(){
		return e;
	}
}
