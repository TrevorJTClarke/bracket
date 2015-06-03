// Require.js Configurations
// -------------------------
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js/app",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

      // Core Libraries
      // --------------
      "jquery": "../libs/jquery",

      "underscore": "../libs/underscore",

      "backbone": "../libs/backbone",

      // Plugins
      // -------
      "backbone.localStorage": "../libs/backbone.localStorage",

      "text": "../libs/text"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      // Backbone.validateAll plugin that depends on Backbone
      "backbone.localStorage": ["backbone"]

  }

});
