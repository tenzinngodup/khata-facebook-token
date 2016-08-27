module.exports = function isAuthenticated(req, res, next) {
  var passport = require('passport');
  var FacebookTokenStrategy = require('passport-facebook-token');
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  //if (req.session.authenticated) {
  //  return next();
  //}
  passport.authenticate('facebook-token', function(error, user, info) {
    // do stuff with user
    if(error){
      // User is not allowed
      // (default res.forbidden() behavior can be overridden in `config/403.js`)
      return res.forbidden('You are not permitted to perform this action.');
    }
    return next();
  });


};
