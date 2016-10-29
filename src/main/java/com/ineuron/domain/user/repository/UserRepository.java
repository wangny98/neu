package com.ineuron.domain.user.repository;

import com.ineuron.util.mysql.MySqlConnection;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.entity.*;

import java.sql.*;

public class UserRepository {

	public UserRepository() {

	}

	public String[] DoAuthenticate(String username, String password) {
		ResultSet sqlResult = null;
		String[] authenticateResponse = new String[5];

		try {
			// 获取连接类实例con
			Connection conn = MySqlConnection.getConnection();

			PreparedStatement sql_statement = conn.prepareStatement("select * from users where username=?");
			sql_statement.clearParameters();
			sql_statement.setString(1, username);

			sqlResult = sql_statement.executeQuery();

			if (sqlResult.next()) {
				// res is not null
				if (sqlResult.getString("password").equals(password)) {
					authenticateResponse[0] = "Success";
					authenticateResponse[1] = sqlResult.getString("username");
					authenticateResponse[2] = sqlResult.getString("firstname");
					authenticateResponse[3] = sqlResult.getString("lastname");
					authenticateResponse[4] = sqlResult.getString("role");

				} else
					authenticateResponse[0] = "Failed: wrong password";
			} else {
				// res is null
				authenticateResponse[0] = "Failed: no such user";
			}

			// 关闭连接和声明
			sql_statement.close();
			conn.close();
		} catch (java.lang.ClassNotFoundException e) {
			System.err.print("ClassNotFoundException");
			System.err.println(e.getMessage());
		} catch (SQLException ex) {
			System.err.println("SQLException: " + ex.getMessage());
		}

		return authenticateResponse;
	}

	public void doRegistter(User user) throws RepositoryException {
		try {
			// 获取连接类实例con，用con创建Statement对象类实例 sql_statement
			Connection conn = MySqlConnection.getConnection();

			PreparedStatement sql_statement = conn.prepareStatement(
					"insert into users (username,lastname,firstname,password,role) values (?, ?, ?, ?, ?)");
			sql_statement.clearParameters();
			sql_statement.setString(1, user.getUsername());
			sql_statement.setString(2, user.getLastrname());
			sql_statement.setString(3, user.getFirstname());
			sql_statement.setString(4, user.getPassword());
			sql_statement.setString(5, user.getRole());
			sql_statement.execute();

			// 关闭连接和声明
			sql_statement.close();
			conn.close();
		} catch (java.lang.ClassNotFoundException e) {

			throw new RepositoryException("ClassNotFoundException", e);
			
		} catch (SQLException ex) {

			throw new RepositoryException("SQLException", ex);
		}

	}

}
