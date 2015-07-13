define(['views/header', 'models/user', 'models/session', 'routers/state', 'jasminequery'], function(Header, User, Session) {
  var view;
  var model;

  describe('Header View', function() {

    beforeEach(function() {
      view = new Header({ model: User });
    });

    describe('when view is constructing', function() {

      it ('should exist', function() {
        expect(view).toBeDefined();
      });

      it ('should have .toggleAuthElems method', function() {
        expect(view.toggleAuthElems).toBeDefined();
      });

      it ('should have .viewProfile method', function() {
        expect(view.viewProfile).toBeDefined();
      });

      it ('should have .newGame method', function() {
        expect(view.logout).toBeDefined();
      });

    });

    describe('when view is rendered', function() {

      beforeEach(function() {
        view.render();
      });

      it ('should have default interface', function() {
        expect(view.$el.find('.profile')).not.toHaveClass('show');
        expect(view.$el.find('.nav-action')).not.toHaveClass('show');
      });

    });

    describe('when user is logged in', function() {
      var testuser = {
        id: 'jfkdlsajf-789dfs-fd9s-f89sd09',
        firstName: 'super',
        lastName: 'man',
        email: 'superman@billabong.com',
        color: '155062'
      };

      beforeEach(function(done) {
        // fake the login
        User.set(testuser);
        Session.set({ auth: true });
        done();
      });

      it ('should have avatar and create button', function() {
        expect(view.$el.find('.profile')).toHaveClass('show');
        expect(view.$el.find('.nav-action')).toHaveClass('show');
      });

    });

    describe('when user is logged out', function() {

      beforeEach(function(done) {
        // fake the logout
        User.remove();
        Session.set({ auth: false });
        done();
      });

      it ('should not have avatar and create button', function() {
        expect(view.$el.find('.profile')).not.toHaveClass('show');
        expect(view.$el.find('.nav-action')).not.toHaveClass('show');
      });

    });

  });
});
