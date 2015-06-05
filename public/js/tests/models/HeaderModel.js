// HeaderModel Testing
describe("HeaderModel", function() {
    var HM;
    beforeEach(function (done) {
        require(["models/HeaderModel"], function(HeaderModel){
            HM = new HeaderModel();
            done();
        });
    });

    it("should be defined", function() {
        expect(HM).toBeDefined();
    });

    it("should have default attrs", function() {
        expect(HM.get("something")).toBeDefined();
    });
});
