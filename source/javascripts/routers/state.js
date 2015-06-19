define([
  'jquery',
  'routers/mainRouter'
],
function(
  $,
  Router
) {

  var stateManager = function () {

    this.go = function ( view ) {

    };

    this.transitionIn = function ( view ) {

    };

    this.transitionOut = function ( view ) {

    };

    this.overlay = function () {

      return {

        show: function () {

        },

        hide: function () {

        }

      };
    };

  };

  return new stateManager();
});
