/**
 * State Manager
 * Control the flow between routes, and simplify transitions between views
 *
 * Flow:
 * 	1. Keep initial view, start to show the overlay
 * 	2. Load next view
 * 	3. Remove the overlay, update the history change
 */
define([
  'jquery',
  'Q',
  'backbone',
  'routers/mainRouter',
  'views/overlay'
],
function(
  $,
  Q,
  Backbone,
  Router,
  Overlay
) {

  // window.router = new Router();
  // $(window).on("hashchange", router.hashChange);
  // window.router.on("route", function(route, params) {
  //   console.log("Different Page: " + route);
  // });

// Backbone.history.navigate("");
// setTimeout(function(){
//   router.navigate("", true);
// },420);

  //  PRIVATE
  var mainEl = $(".main-container"),
      hidden = "invisible";

  var stateManager = function () {

    // defaults
    this.prev = null;
    this.next = null;
    this.router = new Router();
    this.isTransitioning = false;

    this.initialize = function () {
      var _self = this;
      $(window).on("hashchange", _self.router.hashChange);
      // window.router.on("route", function(route, params) {
      //   console.log("Different Page: " + route);
      // });

    };

    this.go = function ( url, params ) {
      if(this.isTransitioning === true){ return; }
      var _self = this;

      // This starts the transitions
      _self.controlFlow()
        .then(function () {
          // Wait to actually go until halfway through
          _self.router.navigate( url, true);
        });
    };

    this.controlFlow = function () {
      var dfd = Q.defer(),
          _self = this;

      _self.transitionStart();

      setTimeout(function(){
        _self.transitionEnd();
      },500);

      // use offset to all promise to return at given time offset
      setTimeout(function(){
        dfd.resolve();
      }, 250);

      return dfd.promise;
    },

    this.transitionStart = function () {
      this.isTransitioning = true;
      // show overlay
      this.overlay.show();
    };

    this.transitionEnd = function () {
      // remove overlay
      this.overlay.hide();

      // reset the views
      this.isTransitioning = false;
      this.prev = this.next;
      this.next = null;
    };

    /**
     * Instanced Methods of Overlay Module
     *
     * USE:
     * overlay.show()
     * overlay.hide()
     */
    this.overlay = Overlay;

  };

  return new stateManager();
});
