package com.ineuron.domain.user.entity;

import java.util.ArrayList;
import java.util.HashSet;
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
	private List<Role> roleList;
	private Set<Permission> allPermissions;

	private static final Logger LOGGER = LoggerFactory.getLogger("User");

	public void addUser(UserRepository userRepository) throws RepositoryException {
		// set default role
		setRoles("user");
		userRepository.addUser(this);
	}

	public void updateUser(UserRepository userRepository) throws RepositoryException {

		userRepository.updateUser(this);

	}

	public User doAuthenticate(UserRepository userRepository) throws RepositoryException {

		return userRepository.DoAuthenticate(this);

	}

	public Set<Permission> getAllPermissions() throws INeuronException {
		if (allPermissions == null) {
			allPermissions = new HashSet<Permission>();
			roleList = new ArrayList<>();
			if (this.roles != null) {
				String[] roles = this.roles.split("\\|");
				RolesCache rolesCache = RolesCache.getRolesCache();
				Map<Integer, Role> rolesMap = rolesCache.getRolesMap();
				for (String role : roles) {
					Role roleObj = rolesMap.get(Integer.valueOf(role));
					if (roleObj != null) {
						allPermissions.addAll(roleObj.getPermissionList());
						roleList.add(roleObj);
					}
				}
			}

			allPermissions.addAll(translatePermissions());
		}		
		return allPermissions;
	}

	public List<Permission> translatePermissions() {

		List<Permission> permissionList = new ArrayList<Permission>();
		if (this.permissions != null) {
			String[] permissions = this.permissions.split(",");
			for (String permission : permissions) {
				String[] fao = permission.split("\\|");
				if (fao.length != 2) {
					LOGGER.error("fao.length: " + fao.length);
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



}
