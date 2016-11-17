package com.ineuron.domain.user.repository;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.dataaccess.db.INeuronDBConnection;
import com.ineuron.domain.user.entity.*;
import com.ineuron.domain.user.valueobject.Role;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserRepository {

	private static final Logger LOGGER = LoggerFactory
			.getLogger(UserRepository.class);

	public UserRepository() {

	}

	public User DoAuthenticate(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		User foundUser;
		boolean validUser = false;

		try {
			foundUser = session.selectOne("getUserByUsername",
					user.getUsername());
			if (foundUser != null) {
				validUser = user.getPassword().equals(foundUser.getPassword());
				System.out.println("select user by using getUserByUsername!"
						+ "Hi " + foundUser.getUsername() + "  role: "
						+ foundUser.getRoles());
			}

		} finally {
			session.close();
		}

		if (validUser)
			return foundUser;
		else
			return null;
	}

	public void addUser(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.insert("addUser", user);
			session.commit();
			System.out.println("insert user by using mybatis!");
		} finally {
			session.close();
		}
	}

	public void updateUser(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("updateUser", user);
			session.commit();
			System.out.println("update user by using mybatis!");
		} finally {
			session.close();
		}
	}
	
	public void deleteUser(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("deleteUser", user);
			session.commit();
			System.out.println("delete user by using mybatis!");
		} finally {
			session.close();
		}
	}

	public List<User> getUserList() throws RepositoryException,
			INeuronException {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<User> users = session.selectList("getUsers");
			return users;
		} finally {
			session.close();
		}

	}

	public User getUserByUsername(String username) throws RepositoryException,
			INeuronException {

		User foundUser;

		System.out.println("in UserRespository: getUserByUsername. username:"
				+ username);
		SqlSession session = INeuronDBConnection.getSession();
		try {
			foundUser = session.selectOne("getUserByUsername", username);
			if (foundUser == null) {
				LOGGER.error("failed to select user by using getUserByUsername!"
						+ "found, username:" + username);
			} else {
				LOGGER.info("select user by using getUserByUsername!"
						+ "found, username:" + username);
			}

		} finally {
			session.close();
		}

		return foundUser;
	}

	public void addRole(Role role) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.insert("addRole", role);
			session.commit();
			System.out.println("insert role by using mybatis!");
		} finally {
			session.close();
		}
	}

	public void updateRole(Role role) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("updateRole", role);
			session.commit();
			System.out.println("update role by using mybatis!");
		} finally {
			session.close();
		}

	}

	public List<Role> getRoleList() throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<Role> roles = session.selectList("getRoles");
			return roles;
		} finally {
			session.close();
		}
	}

	public void deleteRole(Role role) throws RepositoryException {
		
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.update("deleteRole", role);
			session.commit();
			System.out.println("delete role by using mybatis!");
		} finally {
			session.close();
		}
		
	}

}
