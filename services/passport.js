const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');


const currentdate = new Date();
const date = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
const User = mongoose.model('details');
passport.serializeUser((user,done) =>{
  
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then(user =>{
        done(null,user);
    });
});
passport.use(new GoogleStrategy({

    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
},async (accessToken, refreshToken, profile, done)=>{
  const existingUser = await User.findOne({googleId:profile.id});
   
        if(existingUser)
        {done(null,existingUser);}
        else
        {
            new User({googleId: profile.id,name:profile.displayName,time:date,points:0}).save()
            .then(user => done(null,user));
        }
 
   console.log(profile);

     }
    )
);

