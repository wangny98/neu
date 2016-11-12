package com.ineuron.domain.user.entity;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;
import com.ineuron.domain.user.valueobject.Permission;
import com.ineuron.domain.user.valueobject.Function;

public class User {
	
	private Integer id;
	private String username;
	private String firstname;
	private String lastname;
	private String role;
	private String password;
	private String permissions;
	private String permissionflag;
	
	
	public void addUser(UserRepository userRepository) throws RepositoryException{
		//set default role
		setRole("user");
		userRepository.addUser(this);
	}
	
	public void updateUser(UserRepository userRepository) throws RepositoryException{
		
		userRepository.updateUser(this);
		
	}
	
	public User doAuthenticate(UserRepository userRepository) throws RepositoryException{
		
		return userRepository.DoAuthenticate(this);

	}
	
	/*public getUserFuncPermissionList(){
		
	}*/
	
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
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}	
	
	public String getPermissions() {
		return permissions;
	}
	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}	
	
	public String getPermissionflag() {
		return permissionflag;
	}
	public void setPermissionflag(String permissionflag) {
		this.permissionflag = permissionflag;
	}	
}
