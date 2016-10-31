package com.ineuron.domain.user.repository;

import com.ineuron.common.exception.RepositoryException;
import com.ineuron.dataaccess.db.INeuronDBConnection;
import com.ineuron.domain.user.entity.*;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

public class UserRepository {

	public UserRepository() {

	}

	public User DoAuthenticate(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		User foundUser;
		
		try {
			foundUser=session.selectOne("getUserByUsername", user.getUsername());
			session.commit();
			System.out.println("select user by using getUserByUsername!"+"Hi "+foundUser.getUsername()+"role: "+foundUser.getRole());
		} finally {
			session.close();
		}

		return foundUser;
	}

	public void doRegistter(User user) throws RepositoryException {
		SqlSession session = INeuronDBConnection.getSession();
		try {
			session.insert("addUser", user);
			session.commit();
			System.out.println("insert user by using mybatis!");
		} finally {
			session.close();
		}
	}

	public List<User> getUserList() {

		SqlSession session = INeuronDBConnection.getSession();
		try {
			List<User> users = session.selectList("getUsers");
			return users;
		} finally {
			session.close();
		}

	}

}
