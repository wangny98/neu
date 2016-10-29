package com.ineuron.domain.user.respository;


import com.ineuron.util.mysql.MySqlConnection;

import java.sql.*;

public class UserRepository {
	
	public UserRepository(){
	
	}

	public String[] DoAuthenticate(String username, String password)
	{
		ResultSet sqlResult=null;
		String[] authenticateResponse=new String[5];
		
		try
        {
        //获取连接类实例con
        Connection conn = MySqlConnection.getConnection();
                     
        PreparedStatement sql_statement = conn.prepareStatement("select * from users where username=?"); 
        sql_statement.clearParameters(); 
        sql_statement.setString(1, username);
       
        sqlResult = sql_statement.executeQuery();
        
        if (sqlResult.next()) {
            //res is not null
        	if(sqlResult.getString("password").equals(password))
        		{        
        		authenticateResponse[0]="Success";
        		authenticateResponse[1]=sqlResult.getString("username");
        		authenticateResponse[2]=sqlResult.getString("firstname");
        		authenticateResponse[3]=sqlResult.getString("lastname");
        		authenticateResponse[4]=sqlResult.getString("role");
        		
        		}
        	else authenticateResponse[0]="Failed: wrong password";
        }
        else {
            // res is null
        	authenticateResponse[0]="Failed: no such user";
        }
                     
        //关闭连接和声明
        sql_statement.close();
        conn.close();
        } catch(java.lang.ClassNotFoundException e) {
        System.err.print("ClassNotFoundException");
        System.err.println(e.getMessage());
        } catch (SQLException ex) {
        System.err.println("SQLException: " + ex.getMessage());
        }
       
		return authenticateResponse;
	}
	
	public String[] DoRegistter(String username, String lastname, String firstname, String password, String role)
	{
		String[] registerResponse=new String[2];
		
		try
        {
        //获取连接类实例con，用con创建Statement对象类实例 sql_statement
        Connection conn = MySqlConnection.getConnection();
        
        PreparedStatement sql_statement = conn.prepareStatement("insert into users (username,lastname,firstname,password,role) values (?, ?, ?, ?, ?)"); 
        sql_statement.clearParameters(); 
        sql_statement.setString(1, username);
        sql_statement.setString(2, lastname);
        sql_statement.setString(3, firstname);
        sql_statement.setString(4, password);
        sql_statement.setString(5, role);
        sql_statement.execute();
        
       	registerResponse[0]="Success";
       	registerResponse[1]=username;
         
        //关闭连接和声明
        sql_statement.close();
        conn.close();
        } catch(java.lang.ClassNotFoundException e) {
        	  
        registerResponse[0]="Failed";
        registerResponse[1]=username;
        	
        System.err.print("ClassNotFoundException");
        System.err.println(e.getMessage());
        } catch (SQLException ex) {
        	  
        registerResponse[0]="Failed";
        registerResponse[1]=username;
        	
        System.err.println("SQLException: " + ex.getMessage());
        }
		
		return registerResponse;
	}

	
}
