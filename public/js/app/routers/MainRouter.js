// MainRouter.js
// ----------------
define(["jquery", "backbone", "models/HeaderModel", "views/HeaderView", "views/SetupIntroView"],
function($, Backbone, HeaderModel, HeaderView, SetupIntroView) {

    var MainRouter = Backbone.Router.extend({

        initialize: function() {

            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
        },
        routes: {
            // When there is no hash on the url, the home method is called
            "": "index"
        },

        index: function() {
            // Instantiates a new view which will render the header text to the page
            new HeaderView();
            new SetupIntroView();
        }
    });

    return MainRouter;
});
