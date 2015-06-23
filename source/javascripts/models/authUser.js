define([
  'backbone'
],
function(
  Backbone
){

  return Backbone.Model.extend({

    initialize: function () {

      return this;
    },

    defaults: {
      "firstName": "",
      "lastName": "",
      "email": "",
      "password": "",
      "color": ""
    },

    validation: {
      email: {
        required: true,
        pattern: 'email',
        msg: 'Please enter a valid email'
      },
      password: {
        required: true,
        minLength: 8,
        msg: 'Please enter a valid password'
      }
    }

  });

});
