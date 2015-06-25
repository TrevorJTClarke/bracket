define(['views/header', 'models/user', 'models/session', 'routers/state', 'jasminequery'], function(Header, User, Session, State) {
  var view, model;

  describe("Header View", function() {

    beforeEach(function () {
      view = new Header({ model: User });
    });

    describe('when view is constructing', function () {

      it ('should exist', function () {
        expect(view).toBeDefined();
      });

    });

    describe('when view is rendered', function () {

      beforeEach(function () {
        view.render();
      });

      it ('should have default interface', function () {
        expect(view.$el.find('.profile')).not.toHaveClass('show');
        expect(view.$el.find('.nav-action')).not.toHaveClass('show');
      });

    });

    describe('when user is logged in', function () {
      var testuser = {
      		email: "sdup@billabong.com",
      		password: "testtest"
      };

      beforeEach(function (done) {
        Session.login(testuser)
          .then(done,done);
      });

      it ('should have avatar and create button', function () {
        expect(view.$el.find('.profile')).toHaveClass('show');
        expect(view.$el.find('.nav-action')).toHaveClass('show');
      });

    });

    describe('when user is logged out', function () {

      beforeEach(function (done) {
        Session.logout();
        done();
      });

      it ('should not have avatar and create button', function () {
        expect(view.$el.find('.profile')).not.toHaveClass('show');
        expect(view.$el.find('.nav-action')).not.toHaveClass('show');
      });

    });


  });
});
