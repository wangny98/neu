package com.ineuron.domain.user.valueobject;

public class Permission {

	private String function;

	private String operation;

	public String getFunction() {
		return function;
	}

	public void setFunction(String function) {
		this.function = function;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
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
		if (!operation.equals(permission.getOperation()))
			return false;
		return true;

	}

	@Override
	public int hashCode() {

		return function.hashCode() + operation.hashCode();
	}

}
