// MainRouter.js
// ----------------
define([
  "jquery",
  "backbone",
  "views/header",
  "views/mainIndex",
  "views/createChampionship",
  "views/loginSignup",
  'models/session',
  'models/user'
],
function(
  $,
  Backbone,
  HeaderView,
  MainIndexView,
  CreateChampionshipView,
  LoginSignupView,
  Session,
  User
) {

  return Backbone.Router.extend({

    routes: {
      "login": "login",
      "create": "create",
      "": "index"
    },

    initialize: function() {
      new HeaderView();
    },

    loadView: function ( view ) {
      if(this.view === undefined){
        this.view = view;
      } else {
        this.view.remove();
        this.view = view;
      }
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

    create: function () {
      this.loadView(new CreateChampionshipView());
    },

  });
});
