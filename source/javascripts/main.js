require.config({

  'baseUrl': '/',
  'paths': {
    // Core Libraries
    // --------------
    'jquery': 'javascripts/lib/jquery',
    'underscore': 'javascripts/lib/underscore',
    'backbone': 'javascripts/lib/backbone',

    // Plugins
    // -------
    'text': 'javascripts/lib/text',
    'Handlebars': 'javascripts/lib/handlebars',
    'hbars': 'javascripts/lib/hbars',

    // Base Files
    // ----------
    'views': 'javascripts/views',
    'models': 'javascripts/models',
    'routers': 'javascripts/routers',
    'templates': 'javascripts/templates',
    'collections': 'javascripts/collections'
  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  'shim': {
    'Handlebars': {
      'exports': 'Handlebars'
    }
  },

  'hbars': {
    'extension': '.tpl'
  }

});
require([
  'routers/mainRouter'
],
function(Router) {
  // watch the routes
  window.router = new Router();
  $(window).on("hashchange", router.hashChange);
  $(window).on("beforeunload", router.beforeUnload);
  window.router.on("route", function(route, params) {
    console.log("Different Page: " + route);
  });
});
