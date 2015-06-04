// HeaderModel Testing
describe("Header Model", function() {
    var HM;
    beforeEach(function (done) {
        // require(["./public/js/app/models/HeaderModel.js"], function(HeaderModel){
        require(["models/HeaderModel"], function(HeaderModel){
            console.log("HeaderModel::",HeaderModel);
            HM = new HeaderModel();
            done();
        });
    });

    it("should be defined", function() {
        // HM = new HeaderModel();
        console.log("HM",HM.prototype.defaults);
        expect(HM).toBeDefined();
        expect(HM.prototype.defaults).toBeDefined();
        expect(true).toBe(true);
    });
});
