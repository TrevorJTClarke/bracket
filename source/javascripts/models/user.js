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

  return Backbone.Model.extend({

    urlRoot: PS.ROOT + PS.USER,

    defaults: {
      "firstName": "Billa",
      "lastName": "Bong",
      "email": "bb@billabong.com"
    }

  });

});
