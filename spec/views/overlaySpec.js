define(['views/overlay', 'jquery', 'jasminequery'], function(Overlay, $) {
  describe('Overlay View', function() {

    it('should be defined', function() {
      expect(Overlay).toBeDefined();
    });

    describe('when view is rendered', function() {

      it ('should have child elements', function() {
        expect($('body .overlay').html()).toContain('overlay-bold');
        expect($('body .overlay').html()).toContain('overlay-lite');
      });

    });

    describe('.show()', function() {

      beforeEach(function() {
        spyOn(Overlay, 'show').and.callThrough();
      });

      it('should have method', function() {
        expect(Overlay.show).toBeDefined();
      });

      it('should add active state', function() {
        Overlay.show();
        expect($('body .overlay')).toHaveClass('active');
        expect($('body .overlay')).toHaveClass('visible');
      });

      it('should return a promise', function() {
        var showPromise = Overlay.show();
        expect(showPromise.promiseDispatch).toBeDefined();
      });

    });

    describe('.hide()', function() {

      beforeEach(function() {
        spyOn(Overlay, 'hide').and.callThrough();
      });

      it('should have method', function() {
        expect(Overlay.hide).toBeDefined();
      });

      it('should remove active state', function() {
        Overlay.hide();
        expect($('body .overlay')).not.toHaveClass('active');
      });

      it('should return a promise', function() {
        var hidePromise = Overlay.hide();
        expect(hidePromise.promiseDispatch).toBeDefined();
      });

    });

  });
});
