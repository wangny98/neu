Configuration 
Each Dropwizard application has its own subclass of the Configuration class which specifies environment-specific parameters. These parameters are specified in a YAML configuration file which is deserialized to an instance of your application’s configuration class and validated.

Application
Combined with your project’s Configuration subclass, its Application subclass forms the core of your Dropwizard application. The Application class pulls together the various bundles and commands which provide basic functionality.
We can register resources and health checkers in this class