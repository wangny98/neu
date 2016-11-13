package com.ineuron.domain.user.valueobject;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ineuron.common.exception.INeuronException;
import com.ineuron.common.exception.RepositoryException;
import com.ineuron.domain.user.repository.UserRepository;

public class RolesCache {
	
	private static RolesCache rolesCache;
	
	private List<Role> roles;
	
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
			rolesCache.setRoles(roles);
			
			Map<Integer, Role> rolesMap = new HashMap<Integer, Role>();
			for(Role role : rolesCache.getRoles()){
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
	
	public void addRole(Role role){
		role.translatePermissionsToPermissionList();
		roles.add(role);
		rolesMap.put(role.getId(), role);
	}
	
	public void updateRole(Role role) {
		rolesMap.put(role.getId(), role);	
	}
	
	public List<Role> getRoles(){
		return roles;
	}
	
	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public Map<Integer, Role> getRolesMap() {
		return rolesMap;
	}

	public void setRolesMap(Map<Integer, Role> rolesMap) {
		this.rolesMap = rolesMap;
	}

	
}
