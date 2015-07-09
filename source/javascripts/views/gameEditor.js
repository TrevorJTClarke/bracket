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

  // PRIVATE METHODS
  // var _rootEl = $('.main-container');
  // var PL = new Players();
  // var editing   = 'editing';
  // var active    = 'active';
  // var empty     = 'empty';
  // var focussed  = 'focussed';
  // var container = '.game-container';

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
    },

    render: function() {
      // get allPlayers from internal dataset, not stored in DB
      var players = this.model.allPlayers;

      // render the template
      this.$el.html(this.template(players));

      return this;
    },

    // TODO:
    // - break these views into actual child views
    // logic for using cached templates over new ones
    buildChildViews: function() {
      var _this = this;
      var template;
      var tierCount = parseInt(_this.model.get('tierCount'), 10);
      var tmplData = _this.model.attributes;
      var tiersData = [];

      // // TODO: abstract this!
      // if (_this.isEditor) {
      //   tmplData.gameEditor = gameEditorTpl({
      //     gameEditorPlayers: gameEditorPlayerTpl({
      //       editPlayers: _this.modelCache.allPlayers || []
      //     })
      //   });
      // }
      //
      // // If no base tier, generate the first set based on players available
      // if (_this.modelCache.allPlayers && tierCount === 0) {
      //   var fakeTotalPlayers = 4;
      //
      //   fakeTotalPlayers = _this.modelCache.allPlayers.length;
      //   _this.model.generateTier(fakeTotalPlayers);
      //   tierCount = 1;
      // }
      //
      // // find all tier data, and prep for templates
      // if (tierCount > 0) {
      //   for (var i = 1; i <= tierCount; i++) {
      //     var nm = _this.model.tierNamespace + i;
      //     var tmpTierData = _this.model.get(nm);
      //
      //     tiersData[nm] = tmpTierData || [];
      //   }
      // }
      //
      // tmplData.tiers = [];
      // for (var k in tiersData) {
      //   var tmpTier = [];
      //   var tmpSpacers = [];
      //
      //   // Add match templates
      //   for (var i = 0; i < tiersData[k].length; i++) {
      //     tmpTier.push({ matchesTpl: matchesTpl(tiersData[k][i])});
      //   }
      //
      //   tmpSpacers.length = Math.round(tmpTier.length / 2);
      //   tmplData.tiers.push({ spacers: matchesSpacersTpl(tmpSpacers), tiersContainer: tiersContainerTpl(tmpTier)});
      // }
      //
      // var gameElement = gameTpl(tmplData);
      //
      // _this.template = _.template(gameElement);
      // _this.$el.html(this.template);
    },

    setupEditor: function() {
      var _this = this;

      // grab the full data from DB
      PL.getAvailablePlayers()
        .then(function(res) {
          // console.log("players res",res);
          _this.modelCache.allPlayers = res;
          _this.render();

          // Assign some players for testing
          window.__ap = res || [];
        },

        function(err) {
          console.log('err', err);
        });
    },

    /**
     * Save the game to the DB
     */
    finishGame: function() {
      console.log('finishGame');
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
      var players = _this.modelCache.allPlayers.slice(0);

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
      _this.render(true);
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
      this.$el.find(container).removeClass(editing);
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

      if (!_this.modelCache.allPlayers || players.length <= 1) {
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
      var matchId = $(container).attr('id').replace('match_', '');

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
