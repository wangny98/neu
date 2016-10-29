package com.ineuron;

import com.ineuron.health.TemplateHealthCheck;
import com.ineuron.resources.user.*;
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
		bootstrap.addBundle(new AssetsBundle("/assets/", "/assets/"));
	}

	@Override
	public void run(INeuronConfiguration configuration, Environment environment) {
		final AuthenticateResource resource = new AuthenticateResource(configuration.getText(),
				configuration.getDefaultName());

		final RegisterResource regResource = new RegisterResource(configuration.getText(),
				configuration.getDefaultName());

		final TemplateHealthCheck healthCheck = new TemplateHealthCheck(configuration.getText());

		environment.healthChecks().register("text", healthCheck);

		environment.jersey().register(resource);
		environment.jersey().register(regResource);
	}

}
