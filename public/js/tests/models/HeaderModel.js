// HeaderModel Testing
// define(['models/HeaderModel'],function(HeaderModel) {
    describe("Header Model", function() {
        var HM;// = new HeaderModel();
        beforeEach(function (done) {
            // require(["./public/js/app/models/HeaderModel.js"], function(HeaderModel){
            require(["models/HeaderModel"], function(HeaderModel){
                console.log("HeaderModel::",HeaderModel);
                HM = new HeaderModel();
                done();
            });
        });

        it("should be defined", function() {
            expect(HM).toBeDefined();
        });

        // it("should be defined", function() {
        //
        //     expect(HM.prototype.defaults).toBeDefined();
        // });
    });
// });
