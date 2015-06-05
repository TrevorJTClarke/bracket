// MainInit.js
// --------------
require(["jquery", "backbone", "routers/MainRouter"],

  function($, Backbone, MainRouter) {

    // Instantiates a new Desktop Router instance
    new MainRouter();

  }

);
