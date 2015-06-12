// MainRouter.js
// ----------------
define([
  "jquery",
  "backbone",
  "views/header",
  "views/setupIntro",
  "views/newUser"
],
function(
  $,
  Backbone,
  HeaderView,
  SetupIntro,
  NewUserView
) {

  return Backbone.Router.extend({

    initialize: function() {
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();
    },
    routes: {
      // When there is no hash on the url, the home method is called
      "": "index"
    },

    index: function() {
      // Instantiates a new view which will render the header text to the page
      new HeaderView();
      // new SetupIntro();
      new NewUserView();
    }
  });
});
