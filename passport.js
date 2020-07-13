const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

//here is the request for the token
const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//AUTHORIZATION - PROTECTING THE END POINTS
//extracting the jwt token from the request - coockieExtractor.
//use to verify to make sure it is good - secretOrKey.
//payload is the data
passport.use(new JwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "to.gather"
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err,user) => {
        if(err)
            return done(err,false);
        if(user)
            return done(null,user);
        else
            //has no err & no user
            return done(null,false)
    });
}));


//WHEN WE ARE LOGGING IN
//here we are authinticating local strategy the user name & password
//done will be a function when we are done.
passport.use(new LocalStrategy((email, password, done) => {
    User.findOne({email}, (err,user) => {
        //something wen wrong with database
        if(err)
            return done(err);
        //if no user exist
        if(!user)
            return done(null, false);
        //check if password is correct!
        user.comparePassword(password, done);
    })
}));