const config = require("./config/config");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const app = express();
const passport = require("passport");
 require("./middleware/passport");
 require("./middleware/fbpassport");

// configauration
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(session({secret:"cats"
}));
app.use(passport.initialize());
app.use(passport.session())

function isLoggedIn(req,res,next){
    req.user ? next():res.sendStatus(401)
}

app.get("/",(req,res)=>{
    res.send('<a href="/auth/google">SIGN IN WITH GOOGLE</a>')
});

app.get("/auth/google",
passport.authenticate('google',{scope:['email',"profile"]})
);

app.get("/google/callback",
     passport.authenticate('google',{
        successRedirect:"/protected",
        failureRedirect:"/auth/failure"
     })
);

// failure auth route
app.get("/auth/failure",(req,res)=>{
    res.send("Something went wrong!")
})


// protected route 
app.get("/protected",isLoggedIn,(req,res)=>{
    res.send(`Hurrah! Google login successfully done! ${req.user.displayName}`);
})

/// logout 
app.get("/logout",(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})

///////////////////////for Facebook
function isLoggedInFb(req,res,next){
    req.user ? next():res.sendStatus(401)
}

app.get("/facebook",(req,res)=>{
    res.send('<a href="/auth/facebook">SIGN IN WITH FACEBOOK</a>')
});

app.get("/auth/facebook",
passport.authenticate('facebook',{scope:['email',"public_profile"]})
);

app.get("/facebook/callback",
     passport.authenticate('facebook',{
        successRedirect:"/profile",
        failureRedirect:"/error"
     })
);

// failure auth route
app.get("/error",(req,res)=>{
    res.send("Something went wrong!")
})

// protected route 
app.get("/profile",isLoggedInFb,(req,res)=>{
    res.send(`Hurrah! Facebook login successfully done!  ${req.user.displayName} `);
    
});


app.get("/fblogout",(req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/facebook');
      });
})



app.listen(config.PORT,()=>{
   console.log(`server listening on the:${config.HOST}:${config.PORT}`);
});