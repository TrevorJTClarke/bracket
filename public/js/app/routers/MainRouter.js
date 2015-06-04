// MainRouter.js
// ----------------
define(["jquery", "backbone", "models/HeaderModel", "views/HeaderView", "views/SetupCompetitionView"],

    function($, Backbone, HeaderModel, HeaderView, SetupCompetitionView) {

        var MainRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new HeaderView();
                new SetupCompetitionView();

            }

        });

        // Returns the DesktopRouter class
        return MainRouter;

    }

);
