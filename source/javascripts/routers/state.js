define([
  'jquery',
  'routers/mainRouter',
  'views/overlay'
],
function(
  $,
  Router,
  Overlay
) {

  /**
   * State Manager
   * Control the flow between routes, and simplify transitions between views
   *
   * Workflow:
   * 	1. Keep initial view and show the overlay
   * 	2. Fade out the initial view
   * 	3. Load next view
   * 	4. Fade in next view
   * 	5. Remove the overlay and update the history change
   */

  var stateManager = function () {

    this.go = function ( view ) {

    };

    this.transitionIn = function ( view ) {
      // show overlay
      this.overlay.show();
    };

    this.transitionOut = function ( view ) {
      // remove overlay
      this.overlay.hide();

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
