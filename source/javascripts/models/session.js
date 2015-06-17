/**
 * Sessions
 *
 * REF:
 * https://www.parse.com/docs/rest/guide/#sessions-creating-sessions
 */
define([
  'underscore',
  'backbone',
  'models/system',
  'models/cookies',
  'models/user'
], function(
  _,
  Backbone,
  System,
  Cookie,
  User
) {

  // SETUP
  var PS = System.get("Parse");

  var SessionModel = Backbone.Model.extend({

    initialize: function () {
      var _self = this,
          token = _self.get("sessionToken");

      // Set the headers to talk to Parse
      $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
        // set the base route
        if(options.url.search(PS.ROOT) === -1){
          options.url = PS.ROOT + options.url;
        }

        // get session token from local data, or cookie
        if(!token){
          token = Cookie.find("token");
        }

        // set base headers
        jqXHR.setRequestHeader('X-Parse-Application-Id', PS.API_KEY);
        jqXHR.setRequestHeader('X-Parse-REST-API-Key', PS.REST_KEY);
        jqXHR.setRequestHeader('X-Parse-Session-Token', token);
      });
    },

    defaults: {
      auth: false
    },

    /**
     * login a user and store session token for duration of user
     * @param  {Object} data an object of user credentials to pass on to Parse, see example below
     * @return {Promise}      let the callee determine how to handle response data
     *
     * example:
     * {
     * 		email: "email@billabong.com",
     * 		password: "testPass1"
     * }
     */
    login: function( data ) {
      var _self = this,
          username = encodeURIComponent( data.email.split("@")[0] ),
          password = encodeURIComponent( data.password ),
          credString = "?username=" + username + "&password=" + password;

      // Do a GET to /login and send the serialized form creds
      return Backbone.sync("read", this, {
        url: "/login" + credString,
        success: function (res) {
          // Set the token and trigger an auth change
          Cookie.store("token", res.sessionToken);
          _self.set({ auth: true, sessionToken: res.sessionToken });
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

    /**
     * before we start any routers lets see if the user is valid
     * @return {Promise} check if the user is valid, if so start history, if not, show login
     *
     * NOTE: getAuth is wrapped around the router history
     */
    getAuth: function() {
      var _self = this;
      var token = Cookie.find("token");

      if(!token){
        return {
          then: function (res,err) {
            err(true);
          }
        };
      }

      return Backbone.sync("read", this, {
        url: "/users/me",
        success: function (res) {
          // proceed forth!
        },
        error: function (err) {
          // TODO: clear localStorage
          Cookie.remove("token");
          _self.set({ auth: false, sessionToken: null });
        }
      });
    }
  });

  // We need this to be a singleton
  return new SessionModel();

});
