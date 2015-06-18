define([
  'backbone',
  'models/system'
],
function(
  Backbone,
  System
){

  // SETUP
  var PS = System.get("Parse");

  var UserModel = Backbone.Model.extend({

    url: PS.USER,

    initialize: function () {
      return this;
    },

    defaults: {
      "firstName": "Billa",
      "lastName": "Bong",
      "email": "bb@billabong.com",
      "initials": "BB"
    },

    cache: function () {
      var _self = this;
      var cacheData = JSON.stringify(_self.attributes);

      localStorage.setItem("br-user", cacheData);
      return this;
    },

    remove: function () {
      this.clear();
      this.id = null;
      localStorage.removeItem("br-user");
    }

  });

  return new UserModel();

});
