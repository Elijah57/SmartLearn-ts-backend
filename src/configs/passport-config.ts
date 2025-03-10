import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../models/users';
import passport from "passport";
import config from '.';

passport.use(new GoogleStrategy({
    
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    passReqToCallback: true,
    scope: ["email", "profile"]
},
async function (request, accessToken, refreshToken, profile, cb){
    console.log(profile)
    let data = profile?._json
    console.log(data)
    try{

        let user = await User.findOne({email: data.email})
    
        if(!user){
            user = new User();
            user.firstname = data.given_name
            user.lastname = data.family_name
            user.emailVerified = true
            user.email = data.email

            await user.save();
        }
        console.log(user)
        return cb(null, user)
    }catch(error){
        cb(error, false)
    }
}
))

// using JWT not session based authentication
passport.serializeUser((user, done)=>{
    // console.log(user)
    done(null, user)
})

passport.deserializeUser((id, done) =>{
    const user = User.findById(id)
    done(null, user);
});

export default passport;