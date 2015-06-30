// MainRouter.js
// ----------------
define([
  "jquery",
  "backbone",
  "views/header",
  "views/mainIndex",
  "views/scoreboard",
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
  ScoreboardView,
  CreateChampionshipView,
  LoginSignupView,
  Session,
  User
) {

  return Backbone.Router.extend({

    routes: {
      "login": "login",
      "create": "create",
      "scoreboard": "scoreboard",
      "": "index"
    },

    initialize: function() {
      new HeaderView();
    },

    loadView: function ( view ) {
      if(this.view === undefined){
        this.view.remove();
      }
      this.view = view;
    },


    /**
     * -----------------------------------------------------
     * Route Handlers
     * -----------------------------------------------------
     * TODO: this is dumb, take time to refactor
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

    scoreboard: function () {
      this.loadView(new ScoreboardView());
    },

  });
});
