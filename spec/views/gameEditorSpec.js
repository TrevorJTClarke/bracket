define(['views/gameEditor', 'models/championship'], function(GameEditorView, Championship) {
  describe('GameEditorView - child to GameView', function() {
    beforeEach(function() {
      this.view = new GameEditorView({ el: '.game-editor', model: new Championship() });
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

    describe('GameEditorView Methods', function() {

      it('should have .finishGame() method', function() {
        expect(this.view.finishGame).toBeDefined();
      });

      it('should have .randomizePlayers() method', function() {
        expect(this.view.randomizePlayers).toBeDefined();
      });

      it('should have .cleanEditor() method', function() {
        expect(this.view.cleanEditor).toBeDefined();
      });

      it('should have .cleanEditorPlayers() method', function() {
        expect(this.view.cleanEditorPlayers).toBeDefined();
      });

      it('should have .bindDragElems() method', function() {
        expect(this.view.bindDragElems).toBeDefined();
      });

      it('should have .handleDrop() method', function() {
        expect(this.view.handleDrop).toBeDefined();
      });
    });

  });
});
