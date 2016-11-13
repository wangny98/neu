package com.ineuron.domain.user.valueobject;

import java.util.ArrayList;
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

	public List<Permission> getPermissionList() {
		if(permissionList == null){
			permissionList = new ArrayList<Permission>();
			String[] permissions = this.permissions.split(",");
			for(String permission : permissions){
				String[] fao = permission.split("\\|");
				if(fao.length != 2){
					LOGGER.error("Illegal permission format: " + permission);
					continue;
				}
				if(Function.getFunction(Integer.valueOf(fao[0])) == null || Operation.getOperation(Integer.valueOf(fao[1])) == null){
					continue;
				}
				String function = Function.getFunction(Integer.valueOf(fao[0])).toString();
				String operation = Operation.getOperation(Integer.valueOf(fao[1])).toString();
				Permission permissionObj = new Permission();
				permissionObj.setFunction(function);
				permissionObj.setOperation(operation);
				permissionList.add(permissionObj);
			}
		}
				
		return permissionList;
	}

	public void setPermissionList(List<Permission> permissionList) {
		this.permissionList = permissionList;
	}


}
