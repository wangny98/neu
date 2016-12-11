package com.ineuron.domain.user.valueobject;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;

public class Role {

	private String id;
	private String rolename;
	private String permissions;
	private String description;
	private Set<Permission> permissionList;

	private static final Logger LOGGER = LoggerFactory.getLogger(Role.class);

	public void addRole(UserRepository userRepository) throws RepositoryException, INeuronException {
		if(this.id == null){
			this.id = UUID.randomUUID().toString();
		}
		userRepository.addRole(this);
		
	}

	public void updateRole(UserRepository userRepository) throws RepositoryException {
		userRepository.updateRole(this);
	}

	public void translatePermissionsToPermissionList() {

		if (this.permissions != null && permissionList == null) {
			permissionList = new HashSet<Permission>();
			String[] permissions = this.permissions.split(",");
			for (String permission : permissions) {
				String[] fao = permission.split(":");
				if (fao.length != 2) {
					LOGGER.error("fao.length: " + fao.length);
					LOGGER.error("Illegal permission format: " + permission);
					continue;
				}
				
				Permission permissionObj = new Permission();
				String function = fao[0];
				permissionObj.setFunction(function);

				String[] operationArray = fao[1].split("\\|");
				for (String op : operationArray) {	
					permissionObj.getOperations().add(op);
				}
				permissionList.add(permissionObj);
			}
		}

	}

	public void deleteRole(UserRepository userRepository) throws RepositoryException {
		userRepository.deleteRole(this);
		
	}
	

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRolename() {
		return rolename;
	}

	public void setRolename(String rolename) {
		this.rolename = rolename;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Permission> getPermissionList() {
		return permissionList;
	}

	public void setPermissionList(Set<Permission> permissionList) {
		this.permissionList = permissionList;
	}



}
