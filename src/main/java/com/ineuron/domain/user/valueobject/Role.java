package com.ineuron.domain.user.valueobject;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;

public class Role {

	private Integer id;
	private String rolename;
	private String permissions;
	private String description;
	private Set<Permission> permissionList;

	private static final Logger LOGGER = LoggerFactory.getLogger("Role");

	public void addRole(UserRepository userRepository) throws RepositoryException {
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
				if (Function.getFunction(Integer.valueOf(fao[0])) == null) {
					continue;
				}
				Permission permissionObj = new Permission();
				String function = Function.getFunction(Integer.valueOf(fao[0])).toString();
				permissionObj.setFunction(function);

				String[] operationArray = fao[1].split("\\|");
				for (String op : operationArray) {
					if (Operation.getOperation(Integer.valueOf(op)) != null) {
						String operation = Operation.getOperation(Integer.valueOf(op)).toString();
						permissionObj.getOperations().add(operation);
					}
				}
				permissionList.add(permissionObj);
			}
		}

	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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
