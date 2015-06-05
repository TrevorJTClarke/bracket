// HeaderModel Testing
define(['models/ChampionshipModel', 'jquery', 'underscore'], function(ChampionshipModel, $, _) {
    describe("ChampionshipModel", function() {
        var CM = new ChampionshipModel();

        it("should be defined", function() {
            expect(CM).toBeDefined();
        });

        it("should have default attrs", function() {
            expect(CM.get("title")).toBeDefined();
            expect(CM.get("users")).toBeDefined();
            expect(CM.get("bracket")).toBeDefined();
        });

        describe(".createNew()", function() {
            beforeEach(function() {
                spyOn(CM, 'createNew').and.callThrough();

                CM.createNew({ title: "test title" });
            });

            it("should have method", function() {
                expect(CM.createNew).toBeDefined();
            });

            it("method was called", function() {
                expect(CM.createNew).toHaveBeenCalled();
            });

            it("can set the title", function() {
                expect(CM.createNew).toHaveBeenCalledWith({ title: "test title" });
            });

            it("correctly sets the data", function() {
                var data = CM.get("title");
                expect(data).toEqual("test title");
            });
        });
    });
});
