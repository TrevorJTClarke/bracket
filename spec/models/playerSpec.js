define(['models/player'], function(Player) {
  describe('Player', function() {
    var plyr = new Player();

    it('should be defined', function() {
      expect(plyr).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(plyr.get('name')).toBeDefined();
      expect(plyr.get('email')).toBeDefined();
      expect(plyr.get('color')).toBeDefined();
    });

  });
});
