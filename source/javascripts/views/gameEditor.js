define([
  'jquery',
  'backbone',
  'hbars!templates/game_editor',
  'collections/players'
],
function(
  $,
  Backbone,
  gameEditorTpl,
  Players
) {

  return Backbone.View.extend({

    template: gameEditorTpl,

    events: {
      'click #doneEditingPlayers': 'finishGame',
      'click #randomize': 'randomizePlayers'
    },

    initialize: function() {
      // Only listen for changes from parent
      this.model.bind('change', this.render, this);
      this.render();

      return this;
    },

    render: function() {
      // get allPlayers from internal dataset, not stored in DB
      var players = this.model.gamePlayers || [];

      // render the template
      this.$el.html(this.template(players));

      // bind all players to dragging
      this.bindDragElems();

      return this;
    },

    /**
     * Save the game to the DB
     */
    finishGame: function() {
      var _this = this;
      var cacheModel = this.model.clone();
      var unsetOpts = ['silent'];

      this.cleanEditor();

      // update the model, and remove its ID
      cacheModel.url = cacheModel.url + '/' +  cacheModel.get('objectId');
      cacheModel.unset('objectId', unsetOpts);
      cacheModel.unset('tiers', unsetOpts);
      cacheModel.unset('gameEditor', unsetOpts);

      // send changes to DB
      $.ajax({
          url: cacheModel.url,
          type: 'PUT',
          data: JSON.stringify(cacheModel.attributes)
        })
        .then(function(res) {
          console.log('res', res);
        },

        function(err) {
          console.log('err', err);
        });
    },

    /**
     * creates randomized array of players
     * sets up a new tier structure based on the new array setup
     */
    randomizePlayers: function(e) {
      var _this = this;
      var players = _this.model.gamePlayers.slice(0);

      // remove old data
      _this.model.clearTiers();

      // create random array of players
      // an awesome example: http://bost.ocks.org/mike/shuffle/
      function randomizeArray(array) {
        var copy = [];
        var n = array.length;
        var i;
        while (n) {
          i = Math.floor(Math.random() * n--);
          copy.push(array.splice(i, 1)[0]);
        }

        return copy;
      }

      // insert the array into tier matches
      _this.model.associatePlayers(randomizeArray(players));

      // re-render with new tier setup
      _this.render();
      _this.cleanEditorPlayers();
    },

    /**
     * removes all editor elements
     */
    cleanEditor: function() {
      var finishBtn = $('#doneEditingPlayers');
      var editor = $('.game-editor');

      this.cleanEditorPlayers();

      // remove the editor itself
      finishBtn.remove();
      editor.remove();

      // remove editing state
      this.$el.find('.game-container').removeClass('editing');
    },

    /**
     * removes all editor players
     */
    cleanEditorPlayers: function() {
      var players = $('.game-player');

      players.splice(0, 1);

      // remove all player elements and their events
      _.forEach(players, function(player) {
        $(player).remove();
      });
    },


    /**
     * Drag && Drop Handlers
     */
    bindDragElems: function() {
      var _this = this;
      var players = $('.game-player');

      if (!this.model.gamePlayers || players.length <= 1) {
        return;
      }

      // remove the silly random button
      players.splice(0, 1);

      // Binds the player to be drag and dropped into a match
      function bindPlayer(item) {
        $(item).pep({
          droppable: '.match',
          droppableActiveClass: 'draghover',
          activeClass: 'dragging',
          shouldEase: false,
          place: false,
          initiate: function() {
            // set the absolute positioning so drag can work correctly
            var pl = this.$el[0];
            this.$el.css({
              position: 'absolute',
              left: pl.offsetLeft,
              top: pl.offsetTop
            });
          },

          moveTo: function(x, y) {
            // get initial x/y positioning
            var tiny = this.$el;
            var offLeft = parseInt(tiny.css('left').replace('px', ''), 10);
            var offTop = parseInt(tiny.css('top').replace('px', ''), 10);
            var cords = {};

            // removing the funky cordinate formatting
            function formatCord(val, type) {
              val = val.split('=');
              cords[type] = {
                num: parseInt(val[1], 10),
                opp: val[0]
              };
            }

            formatCord(x, 'x');
            formatCord(y, 'y');

            // set the updated position based on updated touch value
            offLeft = (cords.x.opp === '+') ? offLeft + cords.x.num : offLeft - cords.x.num;
            offTop = (cords.y.opp === '+') ? offTop + cords.y.num : offTop - cords.y.num;

            this.$el.css({
              position: 'absolute',
              left: offLeft + 'px',
              top: offTop + 'px'
            });
          },

          stop: function(ev, obj) {
            if (this.activeDropRegions.length > 0) {
              _this.handleDrop(this.activeDropRegions[0], this.$el);
            }
          },

          rest: function() {
            this.$el.removeClass('dragging');
          },

          revert: true,
          revertIf: function(ev, obj) {
            return !this.activeDropRegions.length;
          }
        });
      }

      _.forEach(players, function(player) {
        // add events to player
        bindPlayer(player);
      });

    },

    handleDrop: function(container, player) {
      var _this = this;
      var playerId = $(player).data('drag');
      var navIds = $(container).data('navigate').split('_');
      var matchId = parseInt(navIds[1], 10);

      matchId = parseInt(matchId, 10);

      // remove el from start
      $(player).remove();

      // add data to match
      _this.model.addPlayerToTier(1, playerId, matchId);

      // TODO:
      // re-render
      // _this.render();
    }

  });
});
