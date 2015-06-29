define(['models/system'], function(System) {
  describe('System Model', function() {
    var sys = System;

    it('should be defined', function() {
      expect(sys).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(sys.get('Parse')).toBeDefined();
    });

    it('Parse urls are set properly', function() {
      var PS = sys.get('Parse');
      expect(PS.ROOT).toEqual("https://api.parse.com/1");
      expect(PS.REST_KEY).toEqual("vRKLltmPuDjdfxFFNs6ZD7iHuG5su0J6nTh0VT36");
    });

    it('Parse references build correctly', function() {
      var tempRef = sys.getParseRef( "Championships", "12345" );
      var testParseRef = {
        '__op': 'AddRelation',
        'objects': [{
          '__type': 'Pointer',
          'className': 'Championships',
          'objectId': '12345'
        }]
      };
      expect( tempRef ).toEqual( testParseRef );
    });

  });
});
