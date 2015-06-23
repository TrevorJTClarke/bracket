// Stub the baseline file
function injectBaseHtml() {
  var tmpl = '<div class="header"></div>'+
              '<div class="container warp">'+
                '<div class="main-container"></div>'+
              '</div>'+
              '<div class="overlay"></div>'+
              '<div class="notify"></div>';

  $("body").append(tmpl);
}
injectBaseHtml();

define(['views/overlay', 'jquery', 'jasminequery'], function(Overlay, $) {
  describe('Overlay', function() {

    it('should be defined', function() {
      expect(Overlay).toBeDefined();
    });

    describe('when view is rendered', function () {

      it ('should have child elements', function () {
        expect( $("body .overlay").html() ).toContain('overlay-bold');
        expect( $("body .overlay").html() ).toContain('overlay-lite');
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
        expect( $("body .overlay") ).toHaveClass("active");
        expect( $("body .overlay") ).toHaveClass("visible");
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

      it('should remove active state', function(done) {
        Overlay.hide();
        expect( $("body .overlay") ).not.toHaveClass("active");

        // wait for remove animation success timeout
        setTimeout(function(){
          done();
          expect( $("body .overlay") ).not.toHaveClass("visible");
        },520);
      });

      it('should return a promise', function() {
        var hidePromise = Overlay.hide();
        expect(hidePromise.promiseDispatch).toBeDefined();
      });

    });

  });
});
