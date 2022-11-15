const passport = require("passport");
const config = require("../config/config")
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret:config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4200/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done,) {
  return done(null,profile)
  }
));

passport.serializeUser(function(user,done){
    done(null,user)
});

passport.deserializeUser(function(user,done){
    done(null,user)
});