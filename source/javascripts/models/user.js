define([
  'backbone',
  'models/System'
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
      //
    }

  });

});
