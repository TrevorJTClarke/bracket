define(['underscore', 'backbone', 'backbone.validation'], function(_, Backone, Validator) {
  describe('Validator Model', function() {
    var val = Backbone.Validation.callbacks;

    it('should be defined', function() {
      expect(val).toBeDefined();
    });

    it('should have valid check method', function() {
      expect(val.valid).toBeDefined();
    });

    it('should have invalid check method', function() {
      expect(val.invalid).toBeDefined();
    });

  });
});
