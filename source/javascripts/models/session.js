/**
 * Sessions
 *
 * REF:
 * https://www.parse.com/docs/rest/guide/#sessions-creating-sessions
 */

define([
  'underscore',
  'backbone',
  'models/system'
], function(_, Backbone, System) {

  // SETUP
  var sys = new System();
  var PS = sys.get("Parse");

  return Backbone.Model.extend({

    urlRoot: '/sessions',

    initialize: function () {
      var _self = this;

      // Set the headers to talk to Parse
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // set the base route
        options.url = PS.ROOT + options.url;

        // set base headers
        jqXHR.setRequestHeader('X-Parse-Application-Id', PS.API_KEY);
        jqXHR.setRequestHeader('X-Parse-REST-API-Key', PS.REST_KEY);
        // jqXHR.setRequestHeader('X-Parse-Session-Token', PS.REST_KEY);
      });
    },
    login: function(creds) {
      // Do a POST to /session and send the serialized form creds
      this.save(creds, {
         success: function () {}
      });
    },
    logout: function() {
      // Do a DELETE to /session and clear the clientside data
      var _self = this;
      this.destroy({
        success: function (model, resp) {
          model.clear()
          model.id = null;
          // Set auth to false to trigger a change:auth event
          // The server also returns a new csrf token so that
          // the user can relogin without refreshing the page
          _self.set({ auth: false });

        }
      });
    },
    getAuth: function(callback) {
      // getAuth is wrapped around our router
      // before we start any routers let us see if the user is valid
      this.fetch({
          success: callback
      });
    }
  });

});
