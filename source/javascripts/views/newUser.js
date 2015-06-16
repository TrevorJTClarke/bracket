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

  return Backbone.View.extend({

    el: '.new-user',

    model: new User,

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
      // var user = new Parse.User();
      var newUserData = {
        firstName: this.userFirstName.val(),
        lastName: this.userLastName.val(),
        email: this.userEmail.val(),
        color: this.userColor.val(),
        username: this.userEmail.val(),
        password: this.userPassword.val()
      };

      // create new championship reference, then store new data
      _self.model.set( newUserData );
      _self.model.signUp()
      // _self.model.save()
                .then(function(res) {
                  console.log("res",res.attributes);
                }, function (err) {
                  console.log("err",err);
                });

      // this.collection.create(newUserData);

      // update the total count of new users
      // sys.setStatsTotal("users");

      // this.input.val('');
    }

  });

});
