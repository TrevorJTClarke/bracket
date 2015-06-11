require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "/",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {
    // Core Libraries
    // --------------
    "jquery": "javascripts/lib/jquery",
    "underscore": "javascripts/lib/underscore",
    "backbone": "javascripts/lib/backbone",

    // Plugins
    // -------
    "backbone.localStorage": "javascripts/lib/backbone.localStorage",
    "text": "javascripts/lib/text",
    "hbs": "lib/require-handlebars-plugin/hbs",

    // Base Files
    // ----------
    "views": "javascripts/views",
    "models": "javascripts/models",
    "routers": "javascripts/routers",
    "templates": "javascripts/templates",
    "collections": "javascripts/collections"
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {
    // Backbone.validateAll plugin that depends on Backbone
    "backbone.localStorage": ["backbone"]
  },

  "hbs": { // optional
    "helpers": true,
    "i18n": false,
    "templateExtension": 'hbs',
    "partialsUrl": ''
  }

});

require(['jquery', 'backbone', 'routers/mainRouter'],
function($, Backbone, MainRouter) {

    // Instantiates a new Desktop Router instance
    new MainRouter();

});
