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

    defaults: {
      "firstName": "Billa",
      "lastName": "Bong",
      "email": "bb@billabong.com",
      "initials": "BB"
    },

    cache: function () {
      var _self = this;
      var cacheData = JSON.stringify(_self.attributes);

      window.localStorage.setItem("br-user", cacheData);
      return this;
    }

  });

  return new UserModel();

});
