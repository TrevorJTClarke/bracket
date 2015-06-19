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

  //  PRIVATE
  var mainEl = $(".main-container"),
      hidden = "invisible";

  var stateManager = function () {

    // defaults
    this.prev = null;
    this.next = null;

    this.go = function ( view ) {
      var _self = this;
      _self.transitionOut();

      setTimeout(function(){
        _self.transitionIn();
      },1000);
    };

    this.transitionIn = function ( view ) {
      // show overlay
      this.overlay.hide();
      mainEl.removeClass( hidden );
    };

    this.transitionOut = function ( view ) {
      // remove overlay
      this.overlay.show();
      setTimeout(function(){
        mainEl.addClass( hidden );
      },420);
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
