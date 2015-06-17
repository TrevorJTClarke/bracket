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

  // SETUP
  var sys = new System();

  // PRIVATE METHODS

  function createInitials( str, str2 ) {
    return (str.charAt(0) + str2.charAt(0)).toUpperCase();
  }

  function createUsername( str ) {
    return str.split("@")[0];
  }

  return Backbone.View.extend({

    el: '.main-container',

    model: new User,

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
    },

    render: function() {
      this.template = _.template(userTpl({}));
      this.$el.html(this.template);

      return this;
    },

    toggleSections: function () {
      var activeBtn = "btn-active";
      var activeSection = "ls-active";

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

      // grab all values and store into data object
      for (var i = 0; i < this.loginForm.length; i++) {
        if(this.loginForm[i] && this.loginForm[i].name){
          user[this.loginForm[i].name] = this.loginForm[i].value;
        }
      }


      console.log("Login form",user);
    },

    signupUser: function (e) {
      if(e) {
        e.preventDefault();
      }

      if (!this.userFirstName.val()){ return; }
      var _self = this;
      var newUserData = {
        firstName: this.userFirstName.val(),
        lastName: this.userLastName.val(),
        email: this.userEmail.val(),
        color: this.userColor.val(),
        username: createUsername( this.userEmail.val() ),
        initials: createInitials( this.userFirstName.val(), this.userLastName.val() ),
        password: this.userPassword.val()
      };

      // create new championship reference, then store new data
      _self.model.set( newUserData )
        .save()
        .then(function(res) {
          console.log("res",res.attributes);
        }, function (err) {
          console.log("err",err);
        });


      // this.input.val('');
    }

  });

});
