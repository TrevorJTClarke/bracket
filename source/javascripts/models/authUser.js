/**
 * This data model is only used for validation purposes, please consult user.js for detailed User use.
 */
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

  return Backbone.Model.extend({

    url: PS.USER,

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
      emailSignup: {
        required: true,
        pattern: 'email',
        msg: 'Please enter a valid email'
      },
      password: {
        required: true,
        minLength: 8,
        msg: 'Please enter a valid password'
      },
      firstName: {
        required: true,
        msg: 'Please enter your First Name'
      },
      lastName: {
        required: true,
        msg: 'Please enter your Last Name'
      }
    }

  });

});
