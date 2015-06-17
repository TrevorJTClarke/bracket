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
    }

  });

  return new UserModel();

});
