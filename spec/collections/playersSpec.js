define(['collections/players'], function(Players) {
  describe('Player', function() {
    var plyrs = new Players();

    it('should be defined', function() {
      expect(plyrs).toBeDefined();
    });

    it('should have correct url', function() {
      expect(plyrs.url).toEqual("/classes/ChampionshipPlayers");
    });

    describe('.savePlayers()', function () {

      it('should send batch requests to save all player refs', function () {
        var playerIds = ["1234XYZ","ABC4321"];
        var saveIt = plyrs.savePlayers("CHAMPS",playerIds);

        expect(saveIt.promiseDispatch).toBeDefined();
      });

    });

    describe('.getAvailablePlayers()', function () {

      it('should retrieve all player items', function () {
        var allPlayers = plyrs.getAvailablePlayers();

        expect(allPlayers.promiseDispatch).toBeDefined();
      });

    });

  });
});
