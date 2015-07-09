define([
  'jquery',
  'backbone',
  'hbars!templates/tiers_container',
  'hbars!templates/matches',
  'hbars!templates/matches_spacers',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  tiersContainerTpl,
  matchesTpl,
  matchesSpacersTpl,
  Championship,
  Players
) {

  return Backbone.View.extend({

    template: tiersContainerTpl,

    events: {
    },

    initialize: function() {
      // Only listen for changes from parent
      this.model.bind('change', this.render, this);
      this.render();

      return this;
    },

    render: function() {
      console.log('this.model.attributes', this.$el);

      // render the template
      this.$el.html(this.template(this.model.attributes));

      return this;
    }

  });
});
