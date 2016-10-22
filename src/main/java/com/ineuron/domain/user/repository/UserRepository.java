package com.ineuron.domain.user.repository;

import com.datastax.driver.core.Cluster;
import com.datastax.driver.core.ResultSet;
import com.datastax.driver.core.Row;
import com.datastax.driver.core.Session;

public class UserRepository {
	
	public static void main(String args[]){
		UserRepository ur = new UserRepository();
		ur.test();
	}

	public void test()
	{
		Cluster cluster = null;
		try {
			cluster = Cluster.builder() // (1)
					.addContactPoint("127.0.0.1").build();
			Session session = cluster.connect(); // (2)

			ResultSet rs = session.execute("select release_version from system.local"); // (3)
			Row row = rs.one();
			System.out.println("version = " + row.getString("release_version")); // (4)
			rs = session.execute("select id, name from test.users"); // (3)
			row = rs.one();
			System.out.println("id = " + row.getString("id")); // (4)
			System.out.println("name = " + row.getString("name")); // (4)
		} finally {
			if (cluster != null)
				cluster.close(); // (5)
		}

	}

}
