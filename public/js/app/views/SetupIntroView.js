// View.js
// -------
define(["jquery", "backbone", "models/ChampionshipModel", "text!templates/setup_intro.html"],

    function($, Backbone, ChampionshipModel, template){

        var SetupView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".setup-intro",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                "click button": "testform"
            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

            },

            testform: function (e) {
                e.preventDefault();
                console.log("Hello");
            }

        });

        // Returns the View class
        return SetupView;

    }

);
