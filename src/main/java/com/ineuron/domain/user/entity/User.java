package com.ineuron.domain.user.entity;

import java.util.List;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;
import com.ineuron.domain.user.valueobject.Permission;
import com.ineuron.domain.user.valueobject.Function;
import com.ineuron.domain.user.valueobject.Operation;

public class User {
	
	private Integer id;
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String roles;
	private String operations;
	
	
	private List<Role> roleList;
	private List<Permission> permissionList;
	private List<Operation> operationList;
	
	
	public void addUser(UserRepository userRepository) throws RepositoryException{
		//set default role
		setRoles("user");
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
	
	
}
