define([
  'jquery',
  'backbone',
  'hbars!templates/main_index',
  'hbars!templates/championship_items',
  'models/user',
  'models/session'
],
function(
  $,
  Backbone,
  profileTpl,
  gamesTpl,
  User,
  Session
) {

  // TODO:
  //  link to game

  // PRIVATE METHODS
  var _rootEl = $('.main-container');

  // sort the championships based on time
  function insertionSort(gameArray, attrToSortBy) {
    var finArray = gameArray;
    for (var k = 1; k < finArray.length; k++) {
      for (var i = k; i > 0 && new Date(finArray[i][attrToSortBy]) < new Date(finArray[i - 1][attrToSortBy]); i--) {
        var tmpFile = finArray[i];
        finArray[i] = finArray[i - 1];
        finArray[i - 1] = tmpFile;
      }
    }

    return finArray.reverse();
  }

  return Backbone.View.extend({

    tagName: 'div',
    className: 'main-index',

    model: User,
    gamesData: [],

    events: {
      'click #newChampionship': 'newGame',
      'click [data-navigate]': 'navigate'
    },

    initialize: function() {
      var _this = this;

      _this.render();
      _this.listenTo(_this.model, 'change', this.render);

      _this.constructView();
    },

    render: function() {
      var _this = this;
      var tmplData = _this.model.attributes;
      _this.$el.empty();

      if (_this.gamesData) {
        tmplData.gamesTpl = gamesTpl({
          games: _this.gamesData
        });
      }

      _this.template = _.template(profileTpl(tmplData));
      _this.$el.html(this.template);
      _rootEl.html(_this.$el);
      _this.delegateEvents();

      return this;
    },

    /**
     * grabs all associated data for view, lazily
     */
    constructView: function() {
      var _this = this;

      _this.model.getPlayer()
        .then(function(res) {
          delete res.ChampionshipsRef;
          delete res.UserRef;
          _this.model.set(res);
          _this.render();

          _this.model.getAllChampionships()
            .then(function(res) {
              // sort before add
              var readyGames = insertionSort(res, 'updatedAt');

              _this.gamesData = readyGames;
              _this.render();
            });
        },

        function(err) {
          console.log('player ref res', err);
        });

    },

    newGame: function(e) {
      if (e) {
        e.preventDefault();
      }

      State.go('create');
    },

    navigate: function(e) {
      var url = e.currentTarget.dataset.navigate;
      State.go(url);
    }

  });
});
