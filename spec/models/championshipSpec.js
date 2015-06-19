define(['models/championship'], function(Championship) {
  describe('Championship', function() {
    var championship = new Championship();

    it('should be defined', function() {
      expect(championship).toBeDefined();
    });

    it('should have default attrs', function() {
      expect(championship.get('title')).toBeDefined();
      expect(championship.get('players_ref')).toBeDefined();
      expect(championship.get('tiers')).toBeDefined();
    });

    // describe('.createNew()', function() {
    //   beforeEach(function() {
    //     spyOn(championship, 'createNew').and.callThrough();
    //
    //     championship.createNew({ title: 'test title' });
    //   });
    //
    //   it('should have method', function() {
    //     expect(championship.createNew).toBeDefined();
    //     expect(championship.createNew).toHaveBeenCalled();
    //   });
    //
    //   it('can set the title', function() {
    //     expect(championship.createNew).toHaveBeenCalledWith({ title: 'test title' });
    //   });
    //
    //   // TODO:
    //   // it('correctly sets the data', function() {
    //   //   var data = championship.get('title');
    //   //   expect(data).toEqual('test title');
    //   // });
    // });

    // describe('.addPlayer()', function() {
    //   beforeEach(function() {
    //     spyOn(championship, 'addPlayer').and.callThrough();
    //
    //     championship.addPlayer({ id: '5u43io-543fdos-fjdksl-riew98787', firstName: 'Test', lastName: 'User' });
    //   });
    //
    //   it('should have method', function() {
    //     expect(championship.addPlayer).toBeDefined();
    //     expect(championship.addPlayer).toHaveBeenCalled();
    //   });
    //
    //   // TODO:
    //   // it('can set the user data', function() {
    //   //   expect(championship.addUser).toHaveBeenCalledWith({ id: '5u43io-543fdos-fjdksl-riew98787', firstName: 'Test', lastName: 'User' });
    //   // });
    //   //
    //   // it('correctly sets the data', function() {
    //   //   var data = championship.get('users');
    //   //   var firstUserName = data['5u43io-543fdos-fjdksl-riew98787'].firstName;
    //   //   expect(firstUserName).toEqual('Test');
    //   // });
    // });

    describe('.getPlayerById()', function() {
      it('should have method', function() {
        expect(championship.getPlayerById).toBeDefined();
      });

      it('get by Player Key', function() {
        spyOn(championship, 'getPlayerById').and.callThrough();
        var tierData = championship.getPlayerById('tier_1');

        expect(championship.getPlayerById).toHaveBeenCalled();
      });
    });

    // describe('.addTier()', function() {
    //   var bracketData = championship.get('bracket');
    //   var previousTiers = (bracketData && bracketData.tiers)? bracketData.tiers : 0;
    //
    //   it('should have method', function() {
    //     expect(championship.addTier).toBeDefined();
    //   });
    //
    //   it('can set the tier data', function() {
    //     spyOn(championship, 'addTier').and.callThrough();
    //     championship.addTier();
    //
    //     var tempData = championship.get('bracket');
    //     var tempTiers = (tempData && tempData.tiers)? tempData.tiers : 0;
    //
    //     expect(championship.addTier).toHaveBeenCalled();
    //     expect(tempTiers).toEqual(1); // since we called it twice
    //   });
    //
    //   it('created new Tier Key', function() {
    //     var tempData = championship.get('bracket');
    //     var newTierData = tempData['tier_1'];
    //     expect(newTierData).toBeDefined();
    //   });
    // });

    describe('.getTierById()', function() {

        it('should have method', function() {
            expect(championship.getTierById).toBeDefined();
        });

        it('get by Tier Key', function() {
            spyOn(championship, 'getTierById').and.callThrough();
            var tierData = championship.getTierById('tier_1');

            expect(championship.getTierById).toHaveBeenCalled();
        });

    });

    // describe('.addUserToTier()', function() {
    //     var testData = {
    //         tiers: 1,
    //         tier_1: [{
    //             users: ['5u43io-543fdos-fjdksl-riew98787'],
    //             winner: null,
    //             status: 'new'
    //         }]
    //     };
    //
    //     it('should have method', function() {
    //         expect(championship.addUserToTier).toBeDefined();
    //     });
    //
    //     it('validates needed data', function() {
    //         var failedMethod1 = championship.addUserToTier();
    //         var failedMethod2 = championship.addUserToTier('tier1');
    //
    //         expect(failedMethod1).toBeFalsy();
    //         expect(failedMethod2).toBeFalsy();
    //     });
    //
    //     it('adds user to correct postion', function() {
    //         spyOn(championship, 'addUserToTier').and.callThrough();
    //         championship.addUserToTier('tier_1', '5u43io-543fdos-fjdksl-riew98787');
    //         var tierData = championship.get('bracket');
    //
    //         expect(championship.addUserToTier).toHaveBeenCalled();
    //         expect(tierData['tier_1'][0].users[0]).toEqual(testData['tier_1'][0].users[0]);
    //     });
    //
    //     it('tier data is correct', function() {
    //         spyOn(championship, 'addUserToTier').and.callThrough();
    //         championship.addUserToTier('tier_1', '5u43io-543fdos-fjdksl-riew98787');
    //         var tierData = championship.get('bracket');
    //
    //         expect(tierData).toEqual(testData);
    //     });
    //
    // });
  });
});
