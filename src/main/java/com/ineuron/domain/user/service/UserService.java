package com.ineuron.domain.user.service;

import java.util.ArrayList;
import java.util.List;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.User;
import com.ineuron.domain.user.repository.UserRepository;

public class UserService {

	public void doRegister(User user) throws RepositoryException {

		UserRepository userRep = new UserRepository();

		userRep.doRegistter(user);

	}

	public List<User> getUserList() {

		List<User> users = new ArrayList<User>();
		User user = new User();
		user.setId(11);
		user.setUsername("zhang san");

		User user2 = new User();
		user2.setId(12);
		user2.setUsername("li si");

		User user3 = new User();
		user3.setId(13);
		user3.setUsername("wang wu");

		users.add(user);
		users.add(user2);
		users.add(user3);

		return users;

	}

}
