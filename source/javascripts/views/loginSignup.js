define([
  'jquery',
  'backbone',
  'models/user',
  'hbars!templates/login_signup',
  'models/system',
  'models/session'
],
function(
  $,
  Backbone,
  User,
  userTpl,
  System,
  Session
){

  // PRIVATE METHODS
  var activeBtn = "btn-active";
  var activeSection = "ls-active";

  function createInitials( str, str2 ) {
    return (str.charAt(0) + str2.charAt(0)).toUpperCase();
  }

  function createUsername( str ) {
    return str.split("@")[0];
  }

  return Backbone.View.extend({

    el: '.main-container',

    model: User,

    events: {
      'click #signupSubmit' : 'signupUser',
      'click #loginSubmit'  : 'login',
      'click #tabLogin'     : 'toggleSections',
      'click #tabSignup'    : 'toggleSections'
    },

    initialize: function() {
      this.render();
      this.loginForm = this.$("#loginForm")[0];
      this.signupForm = this.$("#signupForm")[0];
      this.isLogin = true;

      // disable signup, just show login
      // $('#loginSection').addClass("ls-active");
      $('#signupSection').addClass("ls-active");
      this.$("#tabSignup").toggleClass(activeBtn);
    },

    render: function() {
      this.template = _.template(userTpl({}));
      this.$el.html(this.template);

      return this;
    },

    toggleSections: function () {

      this.isLogin = !this.isLogin;
      this.$("#loginSection").toggleClass(activeSection);
      this.$("#signupSection").toggleClass(activeSection);
      this.$("#tabLogin").toggleClass(activeBtn);
      this.$("#tabSignup").toggleClass(activeBtn);
    },

    login: function (e) {
      if(e) {
        e.preventDefault();
      }
      var user = {};

      // grab all form values and store into data object
      for (var i = 0; i < this.loginForm.length; i++) {
        if(this.loginForm[i] && this.loginForm[i].name){
          user[this.loginForm[i].name] = this.loginForm[i].value;
        }
      }

      // validate
      if(!user || !user.email || !user.password){
        return;
      }

      // start session
      Session.login( user )
        .then(function (res) {
          console.log("session login res",res);
          // TODO: redirect to user profile
        },function (err) {
          console.log("session login err",err);
          // TODO: show error message
        });
    },

    signupUser: function (e) {
      var _self = this;
      var newUserData = {};
      if(e) {
        e.preventDefault();
      }

      // grab all form values and store into data object
      for (var i = 0; i < this.signupForm.length; i++) {
        if(this.signupForm[i] && this.signupForm[i].name){
          newUserData[this.signupForm[i].name] = this.signupForm[i].value;
        }
      }

      // Dirty Checks
      if (!newUserData.firstName || !newUserData.lastName || !newUserData.email || !newUserData.password){
        // TODO: SHow error message
        return;
      }

      // add tiny changes
      newUserData.username = createUsername( newUserData.email );
      newUserData.initials = createInitials( newUserData.firstName, newUserData.lastName );
      newUserData.color = newUserData.color.replace("#", "").toUpperCase();

      console.log("newUserData",newUserData);

      // create new user
      _self.model.set( newUserData )
        .save()
        .then(function(res) {
          console.log("res",res);
          Session.setAuth( res );
          User.cache( newUserData );
          // go to main view
          Backbone.history.navigate("");
        }, function (err) {
          console.log("err",err);
        });
    }

  });

});
