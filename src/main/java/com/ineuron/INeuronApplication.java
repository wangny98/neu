package com.ineuron;

import com.hubspot.dropwizard.guice.GuiceBundle;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 * I-Neuron Entry Point!
 * 
 */
public class INeuronApplication extends Application<INeuronConfiguration> {

	public static void main(String[] args) throws Exception {
		new INeuronApplication().run(args);
	}

	@Override
	public String getName() {
		return "I-Neuron";
	}

	@Override
	public void initialize(Bootstrap<INeuronConfiguration> bootstrap) {
		bootstrap.addBundle(new AssetsBundle("/assets/", "/ineuron/"));
		
		//Guice是Google开发的一个轻量级，基于Java5（主要运用泛型与注释特性）的依赖注入框架(IOC)。
		GuiceBundle<INeuronConfiguration> guiceBundle = GuiceBundle.<INeuronConfiguration>newBuilder()
				.addModule(new INeuronModule())
				.enableAutoConfig(getClass().getPackage().getName())
				.setConfigClass(INeuronConfiguration.class)
				.build();

		bootstrap.addBundle(guiceBundle);
	}

	@Override
	public void run(INeuronConfiguration configuration, Environment environment) {

	}

}
