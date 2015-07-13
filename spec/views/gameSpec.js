define(['views/game'], function(GameView) {
  describe('GameView - the parent view', function() {
    beforeEach(function() {
      this.view = new GameView({ gameId: '74389jief' });
    });

    it('should be defined', function() {
      expect(this.view).toBeDefined();
    });

    it('should have render element', function() {
      expect(this.view.$el).toBeDefined();
    });

    it('should have working events', function() {
      var events = this.view.events;
      var eventLngth = Object.keys(events).length;

      expect(events).toBeDefined();
      expect(eventLngth).toBeGreaterThan(0);
    });

    it('should have .getBaseData() method', function() {
      expect(this.view.getBaseData).toBeDefined();
    });
  });
});
