define(['views/gameTiers', 'models/championship'], function(GameTiersView, Championship) {
  describe('GameTiersView - child to GameView', function() {
    beforeEach(function() {
      this.view = new GameTiersView({ el: '.game-container', model: new Championship() });
    });

    it('should be defined', function() {
      expect(this.view).toBeDefined();
    });

    it('should have render element', function() {
      expect(this.view.$el).toBeDefined();
    });

    // it('should have working events', function() {
    //   var events = this.view.events;
    //   var eventLngth = Object.keys(events).length;
    //
    //   expect(events).toBeDefined();
    //   expect(eventLngth).toBeGreaterThan(0);
    // });

    describe('GameTiersView Methods', function() {

      it('should have .goToScoreboard() method', function() {
        expect(this.view.goToScoreboard).toBeDefined();
      });
    });

  });
});
