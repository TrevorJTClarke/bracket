// HeaderModel.js
// --------
define(["jquery", "backbone"], function($, Backbone) {

    // Creates a new Backbone Model class object
    var HeaderModel = Backbone.Model.extend({

        // Model Constructor
        initialize: function() {
            return this;
        },

        // Default values for all of the Model attributes
        defaults: {
            "something": "hi"
        },

        // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
        validate: function(attrs) {

        }

    });

    // Returns the Model class
    return HeaderModel;

});
