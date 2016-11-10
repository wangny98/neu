package com.ineuron.domain.user.service;

import java.util.Date;

import com.ineuron.domain.user.util.DesUtil;

public class SecurityService {

	final private long loginExpireTime = 1000 * 60 * 10;
	final private long timeToUpdateLoginStatus = 1000 * 60;

	final private String seperatorForUsernameAndTime = "---I-Neuron---";

	public String validateAndUpdateApiToken(String apiToken, String username) throws Exception {
		String newApiToken = apiToken;
		String loginStatus = DesUtil.decrypt(apiToken);
		if (loginStatus == null) {
			return null;
		}
		String[] usernameAndTime = loginStatus.split(seperatorForUsernameAndTime);
		if (usernameAndTime.length != 2) {
			return null;
		}
		
		String usernameFromToken = usernameAndTime[0];
		Long time = Long.valueOf(usernameAndTime[1]);
		if (!usernameFromToken.equals(username)) {
			return null;
		}
		Long now = new Date().getTime();
		System.out.println("loginExpireTime=" + loginExpireTime);
		System.out.println("timeToUpdateLoginStatus=" + timeToUpdateLoginStatus);
		System.out.println("time + loginExpireTime < now=" + (time + loginExpireTime < now));
		System.out.println("time + timeToUpdateLoginStatus < now=" + (time + timeToUpdateLoginStatus < now));
		if (time + loginExpireTime < now) {
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
