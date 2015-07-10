define(['models/player'], function(Player) {
  describe('Player', function() {
    var plyr = new Player();

    it('should be defined', function() {
      expect(plyr).toBeDefined();
    });

    it('can store player references correctly', function() {
      var tempRef = plyr.saveDataRef('Championships', '12345');

      expect(tempRef.promise).toBeDefined();
    });

  });
});
