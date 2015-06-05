// ChampionshipData.js
// --------
define(["jquery", "backbone"], function($, Backbone) {

    // Creates a new Backbone Model class object
    var ChampionshipData = Backbone.Model.extend({

        // TODO: setup this to tie to a DB
        initialize: function() {
            return this;
        },
        defaults: {
            "title": "Championship 1",
            "users": [],
            "bracket": {
                "tiers": 0
            }
        },

        // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {

        },

        // set anything new, then store into DB
        createNew: function (data) {
            var _self = this;
            _self.attributes = $.extend(true, _self.attributes, data);
        }

    });

    return ChampionshipData;

});
