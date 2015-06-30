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

  // internal
  var viewMap = {
    'index': MainIndexView,
    'create': CreateChampionshipView,
    'scoreboard': ScoreboardView,
    'login': LoginSignupView,
  };

  return Backbone.Router.extend({

    /**
     * -----------------------------------------------------
     * Route Handlers
     * -----------------------------------------------------
     * TODO: this is dumb, take time to refactor
     */
    routes: {
      "login": function() {
        this.loadView("login")
      },
      "create": function() {
        this.loadView("create")
      },
      "scoreboard": function() {
        this.loadView("scoreboard")
      },
      "": function() {
        this.loadView("index")
      }
    },

    initialize: function() {
      new HeaderView();
    },

    loadView: function ( view ) {
      if(this.view !== undefined && typeof this.view.remove !== undefined){
        this.view.remove();
      }
      this.view = new viewMap[view]();
      this.view.initialize();
    }

  });
});
