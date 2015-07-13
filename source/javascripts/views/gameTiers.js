define([
  'jquery',
  'backbone',
  'models/championship',
  'collections/players'
],
function(
  $,
  Backbone,
  Championship,
  Players
) {

  return Backbone.View.extend({

    template: bracket.tiersContainer,

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
      if (!this.model.gamePlayers) { return; }

      // render the template
      this.$el.html(this.template(this.model.attributes));

      return this;
    },

    goToScoreboard: function(e) {
      var nav = e.currentTarget.dataset.navigate;
      var navIds = nav.split('_');
      var matchId = parseInt(navIds[1], 10);
      var tierId = parseInt(navIds[0], 10);
      var gameId = this.model.get('objectId');
      var tierData = this.model.get(this.model.tierNamespace + tierId);

      // dirty check for players existing for the clicked match
      if (!tierData || !tierData[matchId] || tierData[matchId] === 'object') {
        return;
      }

      State.go(gameId + '/scoreboard/' + matchId);
    }

  });
});
