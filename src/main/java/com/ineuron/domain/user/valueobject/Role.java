package com.ineuron.domain.user.valueobject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;

public class Role {

	private Integer id;
	private String rolename;
	private String permissions;
	private String description;
	private List<Permission> permissionList;

	private static final Logger LOGGER = LoggerFactory.getLogger("Role");

	public void addRole(UserRepository userRepository) throws RepositoryException {
		userRepository.addRole(this);
	}

	public void updateRole(UserRepository userRepository) throws RepositoryException {
		userRepository.updateRole(this);
	}

	public void translatePermissionsToPermissionList() {

		if (this.permissions != null && permissionList == null) {

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
				permissionList = new ArrayList<Permission>();
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

	public void setPermissionList(List<Permission> permissionList) {
		this.permissionList = permissionList;
	}

	public List<Permission> getPermissionList() {
		return permissionList;
	}

}
