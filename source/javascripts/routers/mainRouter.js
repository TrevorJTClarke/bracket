// MainRouter.js
// ----------------
define([
  "jquery",
  "backbone",
  "views/header",
  "views/mainIndex",
  "views/setupIntro",
  "views/loginSignup",
  'models/session',
  'models/user'
],
function(
  $,
  Backbone,
  HeaderView,
  MainIndexView,
  SetupIntroView,
  LoginSignupView,
  Session,
  User
) {

  return Backbone.Router.extend({

    routes: {
      // When there is no hash on the url, the home method is called
      "": "index",
      "login": "login",
      "setup": "setup"
    },

    initialize: function() {
      Backbone.history.start();
      // Tells Backbone to start watching for hashchange events
      Session.getAuth()
        .then(function (res) {
          // TODO: move to user profile or main screen
          Backbone.history.navigate("");
          User.set(res);
        },function (err) {
          Backbone.history.navigate("login");
        });

      new HeaderView();
    },

    index: function() {
      new MainIndexView();
    },

    setup: function () {
      new SetupIntroView();
    },

    login: function () {
      new LoginSignupView();
    }
  });
});
