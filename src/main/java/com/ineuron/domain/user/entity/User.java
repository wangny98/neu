package com.ineuron.domain.user.entity;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;
import com.ineuron.domain.user.valueobject.Permission;
import com.ineuron.domain.user.valueobject.Role;
import com.ineuron.domain.user.valueobject.RolesCache;
import com.ineuron.domain.user.valueobject.Function;
import com.ineuron.domain.user.valueobject.Operation;

public class User {

	private Integer id;
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String roles;
	private String permissions;
	private String permissionFlag = "无";
	private List<Role> roleList;
	private Set<Permission> permissionList;
	private Set<Permission> allPermissions;

	private static final Logger LOGGER = LoggerFactory.getLogger("User");

	public void addUser(UserRepository userRepository) throws RepositoryException {
		// set default role
		//setRoles("5");
		userRepository.addUser(this);
	}

	public void updateUser(UserRepository userRepository) throws RepositoryException {

		userRepository.updateUser(this);

	}
	
	public void deleteUser(UserRepository userRepository) throws RepositoryException {

		userRepository.deleteUser(this);

	}

	public User doAuthenticate(UserRepository userRepository) throws RepositoryException {

		return userRepository.DoAuthenticate(this);

	}

	public Set<Permission> getAllPermissions() throws INeuronException {
		if (allPermissions == null) {
			allPermissions = new HashSet<Permission>();
			roleList = new ArrayList<Role>();
			if (this.roles != null) {
				String[] roles = this.roles.split("\\|");
				RolesCache rolesCache = RolesCache.getRolesCache();
				Map<String, Role> rolesMap = rolesCache.getRolesMap();
				for (String role : roles) {
					Role roleObj = rolesMap.get(role);
					if (roleObj != null) {
						mergeToAllPermissions(roleObj.getPermissionList());
						roleList.add(roleObj);
					}
				}
			}
			translateAndMergePermissionsToAllPermissions();
			mergeToAllPermissions(permissionList);
		}
		return allPermissions;
	}

	public void translateAndMergePermissionsToAllPermissions() {

		if (this.permissions != null && permissionList == null) {
			permissionList = new HashSet<Permission>();
			permissionFlag = "有";
			String[] permissions = this.permissions.split(",");
			for (String permission : permissions) {
				String[] fao = permission.split(":");
				if (fao.length != 2) {
					LOGGER.error("fao.length: " + fao.length);
					LOGGER.error("Illegal permission format: " + permission);
					continue;
				}
				if (Function.getFunction(Integer.valueOf(fao[0])) == null) {
					LOGGER.warn("Illegal function id: " + fao[0]);
					continue;
				}
				Permission permissionObj = new Permission();
				String function = Function.getFunction(Integer.valueOf(fao[0])).toString();
				permissionObj.setFunction(function);

				String[] operationArray = fao[1].split("\\|");
				for (String op : operationArray) {
					if (Operation.getOperation(Integer.valueOf(op)) == null) {
						LOGGER.warn("Illegal operation id: " + op);
						continue;
					}
					String operation = Operation.getOperation(Integer.valueOf(op)).toString();
					permissionObj.getOperations().add(operation);
				}
				permissionList.add(permissionObj);
			}
		}

	}

	private void mergeToAllPermissions(Set<Permission> permissionList) {
		if(permissionList != null){
			for (Permission permission : permissionList) {
				mergeToAllPermissions(permission);
			}
		}

	}

	private void mergeToAllPermissions(Permission permission) {
		Iterator<Permission> iterator = allPermissions.iterator();
		while (iterator.hasNext()) {
			Permission existPermission = iterator.next();
			if (existPermission.equals(permission)) {
				existPermission.getOperations().addAll(permission.getOperations());
				return;
			}
		}
		allPermissions.add(permission.clone());
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}

	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	public String getPermissions() {
		return permissions;
	}

	public String getPermissionFlag() {
		return permissionFlag;
	}

	public Set<Permission> getPermissionList() {
		return permissionList;
	}

	public void setPermissionList(Set<Permission> permissionList) {
		this.permissionList = permissionList;
	}

	
}
