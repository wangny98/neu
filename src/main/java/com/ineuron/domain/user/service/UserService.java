package com.ineuron.domain.user.service;

import java.util.List;

import com.google.inject.Inject;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.Role;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.repository.UserRepository;

public class UserService {

	@Inject
	UserRepository userRepository;
	
	public void doRegister(User user) throws RepositoryException {
		user.addUser(userRepository);
	}

	public void updateUser(User user) throws RepositoryException {
		user.updateUser(userRepository);
	}
	
	public User doAuthenticate(User user) throws RepositoryException {
		return user.doAuthenticate(userRepository);
	}

	public List<User> getUserList() throws RepositoryException {
		return userRepository.getUserList();
	}
	
	public User getUserByUsername(String username) throws RepositoryException {
		return userRepository.getUserByUsername(username);
	}

	
	public void createRole(Role role) throws RepositoryException {
		role.addRole(userRepository);		
	}
	
	public void updateRole(Role role) throws RepositoryException {
		role.updateRole(userRepository);
	}
	
	public List<Role> getRoleList() throws RepositoryException {
		return userRepository.getRoleList();
	}

	

	


}
