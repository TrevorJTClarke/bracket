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
  var _rootEl = $(".main-container");
  var activeBtn = "btn-active";
  var activeSection = "ls-active";

  function hasClass( el, style ) {
    return el.classList.contains(style);
  }

  function createInitials( str, str2 ) {
    return (str.charAt(0) + str2.charAt(0)).toUpperCase();
  }

  function createUsername( str ) {
    return str.split("@")[0];
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'login-signup',

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
      $('#loginSection').addClass("ls-active");
      this.$("#tabLogin").toggleClass(activeBtn);
    },

    render: function() {
      this.template = _.template(userTpl({}));
      this.$el.html(this.template);
      _rootEl.html(this.$el);

      return this;
    },

    close: function() {
      console.log("this.remove",this.remove);
  		this.remove();
  	},

    toggleSections: function (e) {
      if(hasClass(e.currentTarget, "btn-active")){ return; }

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
          State.go("");
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

      // create new user
      _self.model.set( newUserData )
        .save()
        .then(function(res) {
          Session.setAuth( res );
          User.cache( newUserData );
          // go to main view
          State.go("");
        }, function (err) {
          console.log("err",err);
          // TODO: SHow error message
        });
    }

  });

});
