package com.ineuron.util.mysql;

import java.sql.*;

public class MySqlConnection {
	
	 public static Connection getConnection() throws SQLException,
	 java.lang.ClassNotFoundException
	 {
	 //加载MySQL的JDBC的驱动
	 Class.forName("com.mysql.jdbc.Driver");
	 //取得连接的url,能访问MySQL数据库的用户名,密码;
	 String url = "jdbc:mysql://localhost:3306/ineuron";
	 String username = "root";
	 String password = "root";
	 //创建与MySQL数据库的连接类的实例
	 Connection con = DriverManager.getConnection(url, username, password);
	 return con;
	 }
	 

}
