// MainRouter.js
// ----------------
define([
  "jquery",
  "backbone",
  "views/header",
  "views/setupIntro",
  "views/loginSignup",
  'models/session'
],
function(
  $,
  Backbone,
  HeaderView,
  SetupIntro,
  LoginSignupView,
  Session
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
          console.log("Sessions res",res);
          Backbone.history.navigate("setup", { trigger: true });
        },function (err) {
          Backbone.history.navigate("login", { trigger: true });
        });

      new HeaderView();
    },

    index: function() {
      // Instantiates a new view which will render the header text to the page
      // new HeaderView();
      console.log("hiiiiiiiiii index");

      // TESTING:
      // var Statistics = Parse.Object.extend("Statistics");
      // var query = new Parse.Query(Statistics);
      // query.get("Zr36O8V7lf")
      //   .then(function(item) {
      //     console.log("st res",item);
      //     item.decrement("total_users");
      //     item.save();
      //   }, function (err) {
      //     console.log("err",err);
      //   });

      //
      // // TESTING:
      // var FullChamps = Parse.Object.extend("Championship");
      // var FullPlayers = Parse.Object.extend("ChampionshipPlayers");
      // var qUsers = new Parse.Query(Parse.User);
      // var query = new Parse.Query(FullChamps);
      // var squery = new Parse.Query(FullPlayers);
      // query.get("qQvbHGgI61")
      //   .then(function(item) {
      //     // console.log("champs res",item);
      //
      //     var fqu = item.get("players_ref");
      //
      //     squery.get(fqu)
      //       .then(function(res) {
      //         // console.log("players res",res);
      //
      //         qUsers.include(res.attributes.players)
      //           .select("color","initials","firstName","lastName","username")
      //           .find()
      //           .then(function(res) {
      //             console.log("users res",res);
      //             //
      //             // var fqu = item.get("players_ref");
      //             // console.log("fquf",fqu);
      //             // fqu.fetch().then(function (res) {
      //             //   console.log("ressss",res);
      //             // });
      //           }, function (err) {
      //             console.log("err",err);
      //           });
      //       }, function (err) {
      //         console.log("err",err);
      //       });
      //
      //     // fqu.fetch().then(function (res) {
      //     //   console.log("ressss",res);
      //     // });
      //   }, function (err) {
      //     console.log("err",err);
      //   });


      // var currentUser = Parse.User.current();
      // if (currentUser) {
        // new SetupIntro();
      // } else {
      //   new NewUserView();
      // }

      // new LoginSignupView();
    },

    setup: function () {
      console.log("SetupIntro",SetupIntro);
      new SetupIntro();
    },

    login: function () {
      new LoginSignupView();
    }
  });
});
