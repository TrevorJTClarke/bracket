/**
 * Cookie
 * A helper for delicious cookie operations
 *
 * REF: http://www.quirksmode.org/js/cookies.html
 */
define([
  'backbone'
],
function(
    Backbone
) {

  return Backbone.Model.extend({

    keys: [],

    initialize: function () {
      return this;
    },

    find: function (key) {
      var keyEQ = key + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(keyEQ) == 0) return c.substring(keyEQ.length,c.length);
      }
      return null;
    },

    store: function (key, str, time) {
      time = time || 365;
      if(!key || !str){return;}
      if (time) {
    		var date = new Date();
    		date.setTime(date.getTime()+(time*24*60*60*1000));
    		var expires = "; expires="+date.toGMTString();
    	}
    	else var expires = "";
    	// set the cookie
      document.cookie = key+"="+str+expires+"; path=/";
      this.keys.push(key);
    },

    remove: function (key) {
      this.set(key,"-",-1);
    },

    clearAll: function () {
      var keyArray = this.keys,
          _self = this;
      if(keyArray.length > 0){
        for (var i = 0; i < keyArray.length; i++) {
          _self.set( keyArray[i],"-",-1 );
        }
        _self.keys = [];
      }
    }

  });

});
