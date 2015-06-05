// UserData.js
// --------
define(["backbone"], function(Backbone) {

    // Creates a new Backbone Model class object
    var UserData = Backbone.Model.extend({

        // TODO: setup this to tie to a DB
        initialize: function() {
            return this;
        },
        defaults: {
            "firstName": "Billa",
            "lastName": "bong",
            "email": "your@email.com",
            "stats": {
                "championships": 0,
                "win": 0,
                "lose": 0,
                "fin": 0
            },
            "preferences": {
                "push": true
            }
        },

        // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {

        },

        // set anything new, then store into DB
        createNew: function (data) {

        }

    });

    return UserData;

});
