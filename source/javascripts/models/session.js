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

    initialize: function () {
      var _self = this;

      // Set the headers to talk to Parse
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // set the base route
        if(options.url.search(PS.ROOT) === -1){
          options.url = PS.ROOT + options.url;
        }

        // set base headers
        jqXHR.setRequestHeader('X-Parse-Application-Id', PS.API_KEY);
        jqXHR.setRequestHeader('X-Parse-REST-API-Key', PS.REST_KEY);

        // TODO:
        // get session token from cookie
        // jqXHR.setRequestHeader('X-Parse-Session-Token', PS.REST_KEY);
      });
    },
    login: function( data, cb ) {
      var credString = "?username=" + encodeURIComponent( data.email.split("@")[0] ) + "&password=" + encodeURIComponent( data.password );

      // Do a GET to /login and send the serialized form creds
      Backbone.sync("read", this, {
        url: "/login" + credString,
        success: function (res, data) {
          // TODO:
          // set session token in cookie store
          console.log("ressssss",res, data);
          if(cb){
            cb(res);
          }
        },
        error: function (err) {
          console.log("r eerror",err);
          if(cb){
            cb(err);
          }
        }
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
