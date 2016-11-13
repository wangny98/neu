package com.ineuron.domain.user.valueobject;

import java.util.HashSet;
import java.util.Set;

public class Permission {

	private String function;

	private Set<String> operations;
	
	public Permission(){
		operations = new HashSet<String>();
	}

	@Override
	public boolean equals(Object other) {

		if (this == other)
			return true;
		if (other == null)
			return false;
		if (!(other instanceof Permission))
			return false;

		final Permission permission = (Permission) other;

		if (!function.equals(permission.getFunction()))
			return false;
		
		return true;

	}

	@Override
	public int hashCode() {
		return function.hashCode();
	}
	
	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	public Set<String> getOperations() {
		return operations;
	}

	public void setOperations(Set<String> operations) {
		this.operations = operations;
	}

	
}
