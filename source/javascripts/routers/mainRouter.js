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
      "login": "login",
      "setup": "setup",
      "": "index"
    },

    initialize: function() {
      Backbone.history.start();

      // Check the session on start
      Session.getAuth()
        .then(function (res) {
          Backbone.history.navigate("");
        },function (err) {
          Backbone.history.navigate("login");
        });

      new HeaderView();
    },

    loadView: function ( view ) {
      if(this.view === undefined){
        this.view = view;
      } else {
        console.log("this.view",this.view);
        this.view.remove();
        this.view = view;
        // this.view.render();
        // this.view.initialize();
      }
    },

    hashChange : function(e) {
      console.log("hashChange",e);
    },

    beforeUnload : function(e) {
      console.log("beforeUnload",e, this.view);
    },


    /**
     * -----------------------------------------------------
     * Route Handlers
     * -----------------------------------------------------
     */

    index: function() {
      this.loadView(new MainIndexView());
    },

    login: function () {
      this.loadView(new LoginSignupView());
    },

    setup: function () {
      this.loadView(new SetupIntroView());
    },

  });
});
