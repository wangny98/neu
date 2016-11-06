package com.ineuron;

import javax.inject.Named;



import com.google.inject.AbstractModule;

import com.google.inject.Provides;
import com.ineuron.domain.user.repository.UserRepository;



public class INeuronModule extends AbstractModule {

	
	@Override
	protected void configure() {

	}

	

	@Provides
	@Named("template")
	public String provideText(INeuronConfiguration configuration) {
		return configuration.getText();

	}

	@Provides
	@Named("defaultName")
	public String provideDefaultName(INeuronConfiguration configuration) {
		return configuration.getDefaultName();
	}
	
	@Provides
	@Named("userRepository")
	public UserRepository provideUserRepository() {
		return new UserRepository();

	}

}
