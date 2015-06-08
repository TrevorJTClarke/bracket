// ChampionshipData.js
// --------
define(["jquery", "backbone"], function($, Backbone) {

    // Creates a new Backbone Model class object
    var UserData = Backbone.Model.extend({

        // TODO: setup to tie to a DB
        initialize: function() {
            return this;
        },

        defaults: {
            "firstName": "first",
            "lastName": "last",
            "email": "your@email.com",
            "stats": {
                "championships": 0,
                "win": 0,
                "lose": 0,
                "bye": 0
            },
            "preferences": {
                "push": true
            }
        },

        //
        validate: function(attrs) {

        }

    });

    return UserData;

});
