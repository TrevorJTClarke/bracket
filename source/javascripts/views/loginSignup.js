define([
  'jquery',
  'backbone',
  'models/authUser',
  'models/user',
  'hbars!templates/login_signup',
  'models/system',
  'models/session',
  'models/player',
  'backbone.validation',
  'models/notifier'
],
function(
  $,
  Backbone,
  authUser,
  User,
  userTpl,
  System,
  Session,
  Player
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
      if(!isValid){
        return;
      }

      // start session
      Session.login( _self.model.attributes )
        .then(function (res) {
          State.go("");
        },function (err) {
          var resp = JSON.parse(err.responseText);
          Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: resp.error });
        });
    },

    signupUser: function (e) {
      var _self = this;
      if(e) {
        e.preventDefault();
      }

      // grab all form values and store into data object
      for (var i = 0; i < this.signupForm.length; i++) {
        if(this.signupForm[i] && this.signupForm[i].name){
          _self.model.set( this.signupForm[i].name, this.signupForm[i].value);
        }
      }

      // validate
      var isValid = _self.model.isValid(['email','password','firstName','lastName']);
      if(!isValid){
        return;
      }

      // add tiny changes
      _self.model.set("username", createUsername( _self.model.attributes.email ) );
      _self.model.set("initials", createInitials( _self.model.attributes.firstName, _self.model.attributes.lastName ) );
      _self.model.set("color", _self.model.attributes.color.replace("#", "").toUpperCase() );
      _self.model.url = "/users";

      // create new user
      _self.model.save()
        .then(function(res) {
          User.cache( _self.model.attributes );
          Session.setAuth( res );
          // go to main view
          State.go("");

          // create player in DB and store reference
          var plUser = new Player();
          var plUserData = _self.model.attributes;
          delete plUserData.id;
          delete plUserData.password;
          plUser.set( plUserData );
          plUser.saveDataRef( "_User", res.objectId );
        }, function (err) {
          Backbone.Notifier.trigger("NOTIFY:GLOBAL", { type: "error", title: err });
        });
    }

  });

});
