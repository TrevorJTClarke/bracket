define([
  'jquery',
  'backbone',
  'hbars!templates/tiers_container',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  tiersContainerTpl,
  Championship,
  Players
) {

  return Backbone.View.extend({

    template: tiersContainerTpl,

    events: {
      'click [data-navigate]': 'goToScoreboard'
    },

    initialize: function() {
      // Only listen for changes from parent
      this.model.bind('change', this.render, this);
      this.render();

      return this;
    },

    render: function() {

      // render the template
      this.$el.html(this.template(this.model.attributes));

      return this;
    },

    goToScoreboard: function(e) {
      var match = e.currentTarget.dataset.navigate;
      var matchId = parseInt(match.replace('match_', ''), 10);
      var gameId = this.model.get('objectId');
      State.go(gameId + '/scoreboard/' + matchId);
    }

  });
});
