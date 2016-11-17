package com.ineuron.domain.user.valueobject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;

public class RolesCache {
	
	private static RolesCache rolesCache;
	
	private Map<Integer, Role> rolesMap;
	
	private RolesCache(){
		
	}

	public static void init() throws RepositoryException{	
		if(rolesCache == null){
			UserRepository userRepository = new UserRepository();
			rolesCache = new RolesCache();
			List<Role> roles = userRepository.getRoleList();
			for(Role role : roles){
				role.translatePermissionsToPermissionList();
			}
			
			Map<Integer, Role> rolesMap = new HashMap<Integer, Role>();
			for(Role role : roles){
				rolesMap.put(role.getId(), role);
			}
			rolesCache.setRolesMap(rolesMap);
		}
	}
	
	public static RolesCache getRolesCache() throws INeuronException{
		if(rolesCache == null){
			throw new INeuronException("RolesCache is not initiallized!", null);
		}
		return rolesCache;
	}
	
	public List<Role> getRoles() throws INeuronException {
		if(rolesMap == null){
			throw new INeuronException("rolesMap is not initiallized!", null);
		}
		List<Role> roles = new ArrayList<Role>();
		for(Role role : rolesMap.values()){
			roles.add(role);
		}
		return roles;
	}
	
	public void addRole(Role role){
		role.translatePermissionsToPermissionList();
		rolesMap.put(role.getId(), role);
	}
	
	public void updateRole(Role role) {
		role.translatePermissionsToPermissionList();
		rolesMap.put(role.getId(), role);	
	}
	
	
	public Map<Integer, Role> getRolesMap() {
		return rolesMap;
	}

	public void setRolesMap(Map<Integer, Role> rolesMap) {
		this.rolesMap = rolesMap;
	}

}
