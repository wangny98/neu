package com.ineuron.domain.user.service;

import java.util.List;

import com.google.inject.Inject;
import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.repository.UserRepository;
import com.ineuron.domain.user.valueobject.Role;
import com.ineuron.domain.user.valueobject.RolesCache;

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

	public List<User> getUserList() throws RepositoryException, INeuronException {
		List<User> users = userRepository.getUserList();
		for(User user : users){
			user.getAllPermissions();
		}
		return users;
	}
	
	public User getUserByUsername(String username) throws RepositoryException, INeuronException {
		User user = userRepository.getUserByUsername(username);
		user.getAllPermissions();
		return user;
	}
	
	public void createRole(Role role) throws RepositoryException, INeuronException {
		role.addRole(userRepository);
		RolesCache rolesCache = RolesCache.getRolesCache();
		rolesCache.addRole(role);
	}
	
	public void updateRole(Role role) throws RepositoryException {
		role.updateRole(userRepository);
	}
	
	public List<Role> getRoleList() throws RepositoryException, INeuronException {
		RolesCache rolesCache = RolesCache.getRolesCache();
		return rolesCache.getRoles();
	}


}
