/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = {
  login: function (req, res) {
    res.view();
  },

  dashboard: function (req, res) {
    res.view();
  },

  logout: function (req, res){
    req.session.user = null;
    req.session.flash = 'You have logged out';
    res.redirect('user/login');
  },

  'facebook/:token': function (req, res, next) {
    //passport.authenticate('facebook', { scope: ['email', 'user_about_me','public_profile' , 'user_friends']},
    console.log(token);
    passport.authenticate( 'facebook', { scope: ['email', 'user_about_me','public_profile' , 'user_friends']},

      function (err, user) {
        req.logIn(user, function (err) {
          if(err) {
            console.log(err);
            req.session.flash = 'There was an error';
            res.redirect('user/login');
          } else {
            console.log("sucess");

            req.session.user = user;
            res.redirect('/user/dashboard');
          }
        });
      })(req, res, next);

  },
  'token': function (req, res, next) {
    passport.authenticate('facebook-token', function(error, user, info) {
      // do stuff with user
      return res.send(user);
    })(req, res);

  },

  'facebook/callback': function (req, res, next) {
    passport.authenticate('facebook-token', function(error, user, info) {
      // do stuff with user
      res.ok();
    })(req, res);

  }

};

