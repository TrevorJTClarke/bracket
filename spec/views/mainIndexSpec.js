define(['views/mainIndex'], function(MainIndexView) {
  describe('Main Index View', function() {
    beforeEach(function() {
      this.view = new MainIndexView();
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

    describe('MainIndexView Methods', function() {

      it('should have .constructView() method', function() {
        expect(this.view.constructView).toBeDefined();
      });

      it('should have .newGame() method', function() {
        expect(this.view.newGame).toBeDefined();
      });

      it('should have .navigate() method', function() {
        expect(this.view.navigate).toBeDefined();
      });
    });
  });
});
