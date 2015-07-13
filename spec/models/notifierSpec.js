define(['underscore', 'backbone', 'models/notifier'], function(_, Backone, Notifier) {
  var NT = Backone.Notifier;
  var NTView = NT.__view__;

  describe('Notifier Model', function() {

    it('should be defined', function() {
      expect(NT).toBeDefined();
    });

    it('should have base View model', function() {
      expect(NTView).toBeDefined();
    });

    describe('Notifier View Constructor', function() {

      it('should have base Model', function() {
        expect(NTView.model).toBeDefined();
      });

      it('should have .fire() method', function() {
        expect(NTView.fire).toBeDefined();
      });

      it('should have .clearAll() method', function() {
        expect(NTView.clearAll).toBeDefined();
      });

    });

    describe('Notifier Event System', function() {

      it('should have base listener', function() {
        expect(NT.on).toBeDefined();
      });

    });

    describe('Notifier Global Event Handler', function() {

      beforeEach(function() {
        spyOn(NTView, 'fire').and.callThrough();

        Backbone.Notifier.trigger('NOTIFY:GLOBAL', { type: 'info', title: 'hi!' });
      });

      it('calls after event has been fired', function() {
        expect(NTView.fire).toHaveBeenCalled();
        expect(NTView.fire).toHaveBeenCalledWith({ type: 'info', title: 'hi!' });
      });
    });

  });
});
