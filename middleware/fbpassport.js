const passport = require("passport");
const config = require("../config/config");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CLIENT_ID,
    clientSecret:config.FACEBOOK_CLIENT_SECRET,
    callbackURL: "http://localhost:4200/facebook/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done,) {
  return done(null,profile)
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
});

passport.deserializeUser(function(obj,done){
    done(null,obj)
});