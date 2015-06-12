define([
  'jquery',
  'backbone',
  'collections/users',
  'hbars!templates/new_user',
  'models/system'
],
function(
  $,
  Backbone,
  Users,
  userTpl,
  System
){

  // SETUP
  var sys = new System();

  return Backbone.View.extend({

    el: '.new-user',

    collection: new Users,

    events: {
      'click button': 'createNewUser'
    },

    initialize: function() {
      this.render();

      // setup all fields
      this.userFirstName = this.$("#userFirstName");
      this.userLastName = this.$("#userLastName");
      this.userEmail = this.$("#userEmail");
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

      var newUserData = {
        firstName: this.userFirstName.val(),
        lastName: this.userLastName.val(),
        email: this.userEmail.val(),
        color: this.userColor.val()
      };
      console.log("newUserData",newUserData);

      this.collection.create(newUserData);
      
      // update the total count of new users
      sys.setStatsTotal("users");

      // this.input.val('');
    }

  });

});
