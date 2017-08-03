 import mongoose from "mongoose";
 import { Strategy as FacebookStrategy } from "passport-facebook";
 import Users from "../../models/users";
 import secrets from "../secrets"
 // need fb config files

//How this app does local
 export default new FacebookStrategy(
    {
        clientID        : secrets.facebook.appID,
        clientSecret    : secrets.facebook.appSecret,
        callbackURL     : secrets.facebook.callbackUrl,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: true
    },  function(access_token, refresh_token, profile, done) {

            console.log('profile', profile);

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                Users.findOne({ 'id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser = new User();

                        // set all of the facebook information in our user model
                        newUser.fb.id    = profile.id; // set the users facebook id                 
                        newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user                    
                        newUser.fb.firstName  = profile.name.givenName;
                        newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
                        //newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });
            })
        }
)
