package com.ineuron.domain.user.service;

import java.util.Date;
import java.util.Map;

import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.dataformat.yaml.snakeyaml.util.UriEncoder;
import com.ineuron.domain.user.util.DesUtil;

public class SecurityService {

	final private long loginExpireTime = 1000 * 60 * 10;
	final private long timeToUpdateLoginStatus = 1000 * 60;

	final private String seperatorForUsernameAndTime = "---I-Neuron---";
	
	static final Logger LOGGER = LoggerFactory.getLogger(SecurityService.class);
	
	public String validateAndUpdateApiToken(HttpHeaders httpHeader) throws Exception {
		Map<String, Cookie> cookies = httpHeader.getCookies();
		
		Cookie apiTokenCookie = cookies.get("INeuron-ApiToken");
		Cookie usernameCookie = cookies.get("INeuron-UserName");
		
		String apiToken = apiTokenCookie.getValue();
		apiToken = UriEncoder.decode(apiToken);
		String username = usernameCookie.getValue();
		
		return validateAndUpdateApiToken(apiToken, username);
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
