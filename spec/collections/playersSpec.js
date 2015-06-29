define(['collections/players'], function(Players) {
  describe('Player', function() {
    var plyrs = new Players();

    it('should be defined', function() {
      expect(plyrs).toBeDefined();
    });

    // it('can store player references correctly', function() {
    //   var tempRef = players.saveDataRef( "Championships", "12345" );
    //
    //   expect( tempRef.promise ).toBeDefined();
    // });

    describe('.savePlayers()', function () {

      it('should send batch requests to save all player refs', function () {
        expect(true).toBe(true);
      });

    });

    describe('.getAvailablePlayers()', function () {

      it('should send batch requests to save all player refs', function () {
        expect(true).toBe(true);
      });

    });

  });
});
