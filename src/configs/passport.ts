import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import User from '../models/users';
import passport from "passport";
import config from '.';

passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackUrl: config.callbackURL,
    passReqToCallback: true,
    scope: ["email", "profile"]
},
async function (request, accessToken, refreshToken, profile, cb){
    console.log(profile)
    let data = profile?._json
    console.log(data)
    try{

        let user = await User.find({email: data.email})
    
        if(!user){
            const newUser = new User();
            newUser.firstname = data.given_name
            newUser.lastname = data.family_name
    
        }

        cb(null, user)
    }catch(error){
        cb(error, false)
    }
}
))

// using JWT not session based authentication
// passport.serializeUser((user, done)=>{
//     done(null, user)
// })

// passport.deserializeUser((user, done) =>{
//     done(null, user);
// });

export default passport;