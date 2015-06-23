define([
  'jquery',
  'backbone',
  'models/authUser',
  'hbars!templates/login_signup',
  'models/system',
  'models/session',
  'backbone.validation'
],
function(
  $,
  Backbone,
  authUser,
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

    model: new authUser(),

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

      // validation handling
      // this.model.on('error', this.renderErrors, this);
      this.model.on('change', this.updateFields, this);

      // allows binding form to validation from model
      Backbone.Validation.bind(this);

      return this;
    },

    render: function() {
      this.template = _.template(userTpl({}));
      this.$el.html(this.template);
      _rootEl.html(this.$el);

      return this;
    },

    updateFields: function (e) {
      // console.log("updateFields",e);
    },

    toggleSections: function (e) {
      if(hasClass(e.currentTarget, "btn-active")){ return; }

      this.isLogin = !this.isLogin;
      this.$("#loginSection").toggleClass(activeSection);
      this.$("#signupSection").toggleClass(activeSection);
      this.$("#tabLogin").toggleClass(activeBtn);
      this.$("#tabSignup").toggleClass(activeBtn);
    },

    remove: function() {
      // Remove the validation binding
      Backbone.Validation.unbind(this);
      return Backbone.View.prototype.remove.apply(this, arguments);
    },

    login: function (e) {
      var _self = this;
      if(e) {
        e.preventDefault();
      }

      // grab all form values and store into data object
      for (var i = 0; i < this.loginForm.length; i++) {
        if(this.loginForm[i] && this.loginForm[i].name){
          _self.model.set( this.loginForm[i].name, this.loginForm[i].value);
        }
      }

      // validate
      var isValid = this.model.isValid(['email','password']);
      // console.log("isValid",isValid, this.model.attributes);
      if(!isValid){
        return;
      }

      // // start session
      // Session.login( user )
      //   .then(function (res) {
      //     State.go("");
      //   },function (err) {
      //     var resp = JSON.parse(err.responseText);
      //     console.log("session login err",resp.error);
      //     // TODO: show error message
      //   });
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
