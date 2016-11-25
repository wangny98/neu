package com.ineuron.domain.user.service;

import java.util.Date;
import java.util.Map;

import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.dataformat.yaml.snakeyaml.util.UriEncoder;
import com.google.inject.Inject;
import com.google.inject.name.Named;
import com.ineuron.domain.user.util.DesUtil;

public class SecurityService {

	final private long loginExpireTime = 1000 * 60 * 10;
	final private long timeToUpdateLoginStatus = 1000 * 60;

	final private String seperatorForUsernameAndTime = "---I-Neuron---";
	
	final private String DEV_MODE = "dev";
	
	static final Logger LOGGER = LoggerFactory.getLogger(SecurityService.class);
	
	@Inject
	@Named("environment")
	String environment;
	
	/**
	 * this method is used to support debug mode, and skip the apiToken validation 
	 */
	public String validateAndUpdateApiToken(HttpHeaders httpHeader, Boolean debug) throws Exception {
		
		String newApiToken = validateAndUpdateApiToken(httpHeader);
		LOGGER.info("environment = " + environment + "; debug = " + debug); 
		if(newApiToken == null && DEV_MODE.equals(environment) && debug){
			newApiToken = "debug";
		}		
		return newApiToken;
	}
	
	public String validateAndUpdateApiToken(HttpHeaders httpHeader) {
		
		Map<String, Cookie> cookies = httpHeader.getCookies();
		
		Cookie apiTokenCookie = cookies.get("INeuron-ApiToken");
		Cookie usernameCookie = cookies.get("INeuron-UserName");
		
		String apiToken = apiTokenCookie.getValue();
		apiToken = UriEncoder.decode(apiToken);
		String username = usernameCookie.getValue();
		String newApiToken = null;
		try {
			newApiToken = validateAndUpdateApiToken(apiToken, username);
		} catch (Exception e) {
			LOGGER.error("Failed to validate And Update ApiToken: " + e.getMessage());
		}
		return newApiToken;
	}
	

	public String validateAndUpdateApiToken(String apiToken, String username) throws Exception {

		String newApiToken = apiToken;
		String loginStatus = DesUtil.decrypt(apiToken);
		if (loginStatus == null) {
			LOGGER.error("user: " + username + ", invalid apiToken: " + apiToken);
			return null;
		}
		String[] usernameAndTime = loginStatus.split(seperatorForUsernameAndTime);
		if (usernameAndTime.length != 2) {
			LOGGER.error("invalid loginStatus: " + loginStatus);
			return null;
		}
		
		String usernameFromToken = usernameAndTime[0];
		Long time = Long.valueOf(usernameAndTime[1]);
		if (!usernameFromToken.equals(username)) {
			LOGGER.error("the logined user is " + username + ", but the user in apiToken is " + usernameFromToken);
			return null;
		}
		Long now = new Date().getTime();
		if (time + loginExpireTime < now) {
			LOGGER.info("apiToken expired for user: " + username);
			return null;
		} else if (time + timeToUpdateLoginStatus < now) {
			newApiToken = createApiToken(username);
		}

		return newApiToken;

	}
	
	public String createApiToken(String username) throws Exception{	
		Long now = new Date().getTime();
		return DesUtil.encrypt(username + seperatorForUsernameAndTime + now);
	}

}
