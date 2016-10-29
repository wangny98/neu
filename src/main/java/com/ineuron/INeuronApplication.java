package com.ineuron;

import com.ineuron.health.TemplateHealthCheck;
import com.ineuron.resources.*;
import io.dropwizard.Application;
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
        // nothing to do yet
    }

   

        @Override
        public void run(INeuronConfiguration configuration,
                        Environment environment) {
        	final UserResource userResource = new UserResource(
        	        configuration.getText(),
        	        configuration.getDefaultName()
        	    );
        
        	
    	final TemplateHealthCheck healthCheck =
    	        new TemplateHealthCheck(configuration.getText());
    	
    	    environment.healthChecks().register("text", healthCheck);

    	    environment.jersey().register(userResource);
    	 
    }

}
