require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "source/javascripts",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {
    // Core Libraries
    // --------------
    "jquery": "lib/jquery",
    "underscore": "lib/underscore",
    "backbone": "lib/backbone",

    // Plugins
    // -------
    "backbone.localStorage": "lib/backbone.localStorage",
    "text": "lib/text"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    // Backbone.validateAll plugin that depends on Backbone
    "backbone.localStorage": ["backbone"]
  }

});

require(['jquery', 'backbone', 'routers/MainRouter'],

  function($, Backbone, MainRouter) {

    // Instantiates a new Desktop Router instance
    new MainRouter();

  }

);
