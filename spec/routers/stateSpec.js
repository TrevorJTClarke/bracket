define(['routers/state', 'models/cookies', 'backbone'], function(State, Cookie, Backbone) {
  describe('State Router', function() {

    afterEach(function () {
      Cookie.clearAll();
    });

    it('should be defined', function() {
      expect(State).toBeDefined();
    });

    describe('.go()', function() {

      beforeEach(function() {
        spyOn(State, 'go').and.callThrough();
      });

      it('should have method', function() {
        expect(State.go).toBeDefined();
      });

      // Dumb setTimeouts
      it('should use correct timing for transitions', function(done) {
        var indexUrl = "";
        // Make sure we have a token
        Cookie.store("token", "fjsdkafjkdfjksadlfs");

        State.go(indexUrl);

        setTimeout(function(){
          done();
          expect( indexUrl ).toEqual( window.location.hash );
        },530);

      });

    });

    describe('.controlFlow()', function() {

      beforeEach(function() {
        spyOn(State, 'controlFlow').and.callThrough();
      });

      it('should have method', function() {
        expect(State.controlFlow).toBeDefined();
      });

      // Dumb setTimeouts
      it('should use correct timing for transitions', function(done) {
        var halfIsGood,
            fullIsGood;

        // Make sure we have a token
        Cookie.store("token", "fjsdkafjkdfjksadlfs");

        // fire off the method to check
        State.controlFlow();

        setTimeout(function(){
          halfIsGood = State.isTransitioning;
          expect(halfIsGood).toBeTruthy();
        },260);

        setTimeout(function(){
          fullIsGood = State.isTransitioning;
          expect(fullIsGood).toBeFalsy();
          done();
        },510);

      });

    });

    describe('.transitionStart()', function() {

      it('should have method', function() {
        expect(State.transitionStart).toBeDefined();
      });

      it('should start the transition action', function() {
        State.transitionStart();

        expect(State.isTransitioning).toBeTruthy();
      });

    });

    describe('.transitionEnd()', function() {

      it('should have method', function() {
        expect(State.transitionEnd).toBeDefined();
      });

      it('should finish the transition action', function() {
        State.transitionEnd();

        expect(State.isTransitioning).toBeFalsy();
      });

    });

    // Stubbed just to make sure we dont lose reference, full tests under the view module
    describe('.overlay()', function() {

      it('should have overlay methods', function() {
        expect(State.overlay).toBeDefined();
      });

      it('should have overlay show method', function() {
        expect(State.overlay.show).toBeDefined();
      });

      it('should have overlay hide method', function() {
        expect(State.overlay.hide).toBeDefined();
      });

    });

  });
});
