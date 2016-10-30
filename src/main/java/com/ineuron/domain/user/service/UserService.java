package com.ineuron.domain.user.service;

import java.util.List;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.repository.UserRepository;

public class UserService {

	public void doRegister(User user) throws RepositoryException {

		UserRepository userRep = new UserRepository();
		user.setRole("user");
		userRep.doRegistter(user);

	}

	public List<User> getUserList() {

		UserRepository userRep = new UserRepository();
		List<User> users = userRep.getUserList();

		return users;

	}

}
