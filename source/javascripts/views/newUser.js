define([
  'jquery',
  'backbone',
  'models/user',
  'hbars!templates/new_user',
  'models/system'
],
function(
  $,
  Backbone,
  User,
  userTpl,
  System
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

    el: '.new-user',

    model: User,

    events: {
      'click button': 'createNewUser'
    },

    initialize: function() {
      this.render();

      // setup all fields
      this.userFirstName = this.$("#userFirstName");
      this.userLastName = this.$("#userLastName");
      this.userEmail = this.$("#userEmail");
      this.userPassword = this.$("#userPassword");
      this.userColor = this.$("#userColor");
    },

    render: function() {
      this.template = _.template(userTpl({}));
      this.$el.html(this.template);

      return this;
    },

    createNewUser: function (e) {
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
