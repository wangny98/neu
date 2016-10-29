package com.ineuron;

import com.ineuron.health.TemplateHealthCheck;
import com.ineuron.resources.HelloWorldResource;
import com.ineuron.resources.PersonResource;
import com.ineuron.resources.UserResource;

import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;


/**
 * 
 *
 */
public class NeuronApplication extends Application<NeuronConfiguration> {
	public static void main(String[] args) throws Exception {
		new NeuronApplication().run(args);
	}

	@Override
	public String getName() {
		return "I-Neuron";
	}

	@Override
	public void initialize(Bootstrap<NeuronConfiguration> bootstrap) {
		bootstrap.addBundle(new ViewBundle<NeuronConfiguration>());
		bootstrap.addBundle(new AssetsBundle("/assets/", "/assets/"));
	}

	@Override
	public void run(NeuronConfiguration configuration, Environment environment) throws Exception {
		
		final HelloWorldResource resource = new HelloWorldResource(configuration.getTemplate(),
				configuration.getDefaultName());

		final TemplateHealthCheck healthCheck = new TemplateHealthCheck(configuration.getTemplate());

		environment.healthChecks().register("template", healthCheck);

		environment.jersey().register(resource);
		
		
		final PersonResource pResource = new PersonResource();
		environment.jersey().register(pResource);
		
		final UserResource uResource = new UserResource();
		environment.jersey().register(uResource);
	}

}
