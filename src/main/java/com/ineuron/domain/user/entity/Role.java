package com.ineuron.domain.user.entity;

import java.util.Map;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;
import com.ineuron.domain.user.valueobject.Function;
import com.ineuron.domain.user.valueobject.Permission;

public class Role {

	private Integer id;
	private String roleName;
	private String permissions;
	// private Map<Function, Permission> permissions;

	public void addRole(UserRepository userRepository) throws RepositoryException {
		userRepository.addRole(this);
	}

	public void updateRole(UserRepository userRepository) throws RepositoryException {
		userRepository.updateRole(this);
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
	
	

}
