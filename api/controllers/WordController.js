/**
 * WordController
 *
 * @description :: Server-side logic for managing words
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = {

  'Create': function (req, res, next) {
    //passport.authenticate('facebook',
    //  function (req, res) {
    //    res.redirect('/user/dashboard');
    //  })(req, res, next);

    passport.authenticate('facebook-token', function(error, user, info) {
      // do stuff with user
      if(error){
        return res.send(error);
      }else if(info){
        return res.send(info);

      }
      var values = req.body;
      values.author = user.id;

      Word.create(values).exec(function (err, records) {
        return res.send(records);

      });
    })(req, res);

  }
};

