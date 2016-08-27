var passport = require('passport');
  FacebookStrategy = require('passport-facebook').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');


function findById(id, fn) {
  User.findOne(id).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByFacebookId(id, fn) {
  User.findOne({
    facebookId: id
  }).exec(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: "1495326877435490",
    clientSecret: "0a7084326ed6ddff2eca42d6d30caa7c",
    callbackURL: "http://localhost:1337/user/facebook/callback",
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {

    findByFacebookId(profile.id, function (err, user) {

      // Create a new User if it doesn't exist yet
      if (!user) {
        User.create({

          facebookId: profile.id,
          displayName:profile.displayName
          // You can also add any other data you are getting back from Facebook here
          // as long as it is in your model

        }).exec(function (err, user) {
          if (user) {
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {
            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

        // If there is already a user, return it
      } else {
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      }
    });
  }
));

passport.use(new FacebookTokenStrategy({
    clientID: '1495326877435490',
    clientSecret: "0a7084326ed6ddff2eca42d6d30caa7c"
  }, function(accessToken, refreshToken, profile, done) {
     if(profile.emails.length > 0 ){
       var values = {
         facebookId: profile.id,
         displayName:profile.displayName,
         token:accessToken,
         email:profile.emails[0].value};

       User.findOrCreate({facebookId: profile.id},values, function (error, user) {
         return done(error, user);
       });
     }else{
       User.findOrCreate({
         facebookId: profile.id,
         displayName:profile.displayName,
         token:accessToken
       }, function (error, user) {
         return done(error, user);
       });
     }

  }
));

