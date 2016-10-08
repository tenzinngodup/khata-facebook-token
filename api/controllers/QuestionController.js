/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
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
      var values = req.body.data;
      values.author = user.id;

      Question.create(values).exec(function (err, records) {
        return res.send(records);

      });
    })(req, res);

  }

};

