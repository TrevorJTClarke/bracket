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

        describe(".addUser()", function() {
            beforeEach(function() {
                spyOn(CM, 'addUser').and.callThrough();

                CM.addUser({ id: "5u43io-543fdos-fjdksl-riew98787", firstName: "Test", lastName: "User" });
            });

            it("should have method", function() {
                expect(CM.addUser).toBeDefined();
                expect(CM.addUser).toHaveBeenCalled();
            });

            it("can set the user data", function() {
                expect(CM.addUser).toHaveBeenCalledWith({ id: "5u43io-543fdos-fjdksl-riew98787", firstName: "Test", lastName: "User" });
            });

            it("correctly sets the data", function() {
                var data = CM.get("users");
                var firstUserName = data[0].firstName;
                expect(firstUserName).toEqual("Test");
            });
        });

        describe(".addTier()", function() {
            var bracketData = CM.get("bracket");
            var previousTiers = (bracketData && bracketData.tiers)? bracketData.tiers : 0;

            beforeEach(function() {
                spyOn(CM, 'addTier').and.callThrough();

                CM.addTier();
            });

            it("should have method", function() {
                expect(CM.addTier).toBeDefined();
                expect(CM.addTier).toHaveBeenCalled();
            });

            it("can set the tier data", function() {
                var tempData = CM.get("bracket");
                var tempTiers = (tempData && tempData.tiers)? tempData.tiers : 0;
                expect(tempTiers).toEqual(2); // since we called it twice
            });

            it("created new Tier Key", function() {
                var tempData = CM.get("bracket");
                var newTierData = tempData["tier_1"];
                expect(newTierData).toBeDefined();
            });
        });
    });
});
