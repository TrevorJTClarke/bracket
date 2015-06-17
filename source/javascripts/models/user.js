define([
  'backbone',
  'models/system'
],
function(
  Backbone,
  System
){

  // SETUP
  var SYS = new System();
  var PS = SYS.get("Parse");

  var UserModel = Backbone.Model.extend({

    url: PS.USER,

    defaults: {
      "firstName": "Billa",
      "lastName": "Bong",
      "email": "bb@billabong.com"
    }

  });

  return new UserModel();

});
