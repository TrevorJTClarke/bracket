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
          User.cache( res );
          _self.set({ auth: true, sessionToken: res.sessionToken });
        }
      });
    },

    /**
     * removes a user session
     */
    logout: function() {
      var _self = this;
      User.remove();
      Cookie.remove("token");

      _self.url = "/logout";
      _self.destroy({
        success: function (model,err) {
          _self.set({ auth: false, sessionToken: null });
        }
      });
    },

    /**
     * before we start any routers lets see if the user is valid
     * @return {Promise} check if the user is valid, if not show login
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
          User.cache( res );
        },
        error: function (err) {
          User.remove();
          Cookie.remove("token");
          _self.set({ auth: false, sessionToken: null });
        }
      });
    },

    /**
     * stores the auth token locally for session repeated use
     * @param {object} data from a request to the API, see example below
     *
     * example:
     * {
     * 		objectId: "C36uCWNESq",
     * 		createdAt: "2015-06-19T15:08:54.750Z",
     * 		sessionToken: "5afsHGliHVFhMGRlQ1odOYa1n"
     * }
     */
    setAuth: function ( data ) {
      if(!data || !data.sessionToken){ return; }
      Cookie.store("token", data.sessionToken);
      this.set({ auth: true, sessionToken: data.sessionToken });
    }

  });

  // We need this to be a singleton
  return new SessionModel();

});
