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
  'models/session',
  'routers/mainRouter',
  'views/overlay'
],
function(
  $,
  Q,
  Backbone,
  Session,
  Router,
  Overlay
) {

  //  PRIVATE
  var mainEl = $('.main-container');
  var hidden = 'invisible';
  var offsetDefault = 500;

  var StateManager = function() {

    // defaults
    this.router = new Router();
    this.isTransitioning = false;
    this.current = '';

    this.initialize = function() {
      Backbone.history.start({pushState: true});
      this.current = window.location.hash || '';
    };

    /**
     * navigates user to the specified view
     * @param  {String} url - the route to navigate to, specified in the mainRouter.js
     */
    this.go = function(url) {
      if (this.isTransitioning === true) { return; }

      if (this.current === url) { return; }

      var _this = this;

      // This starts the transitions
      _this.controlFlow()
        .then(function() {
          // Wait to actually go until halfway through
          _this.router.navigate(url, true);
          _this.current = url;
        },

        function() {
          _this.router.navigate('login', {trigger: true, replace: true});
          _this.current = 'login';
        });
    };

    /**
     * handles the transition logic, see the Flow noted above
     * @return {Promise} can execute next function after finished transition
     */
    this.controlFlow = function() {
      var dfd = Q.defer();
      var _this = this;
      var isValid = Session.checkAuth();

      if (isValid === true) {
        _this.transitionStart();

        setTimeout(function() {
          _this.transitionEnd();
        }, offsetDefault);

        // use offset to all promise to return at given time offset
        setTimeout(function() {
          dfd.resolve();
        }, offsetDefault / 2);
      } else {
        dfd.reject();
      }

      return dfd.promise;
    },

    /**
     * starts the transition between current view and then next view
     */
    this.transitionStart = function() {
      this.isTransitioning = true;

      // show overlay
      this.overlay.show();
    };

    /**
     * ends the transition between current view and then next view
     */
    this.transitionEnd = function() {
      // remove overlay
      this.overlay.hide();

      // reset the views
      this.isTransitioning = false;
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

  return new StateManager();
});
