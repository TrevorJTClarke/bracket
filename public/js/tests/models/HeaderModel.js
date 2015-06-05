// HeaderModel Testing
define(['models/HeaderModel', 'jquery', 'underscore'], function(HeaderModel, $, _) {
    describe("HeaderModel", function() {
        var HM = new HeaderModel();

        it("should be defined", function() {
            expect(HM).toBeDefined();
        });

        it("should have default attrs", function() {
            expect(HM.get("something")).toBeDefined();
        });
    });
});
