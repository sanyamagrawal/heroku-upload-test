/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

 import mongoose from "mongoose"
 import { Strategy as LocalStrategy } from "passport-local"
 import Users from "../../models/users"

 /*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
 export default new LocalStrategy({
 	usernameField: "username"
 }, (username, password, done) => { 	
 	Users.findOne({username}, (err, user) => {
 		if(!user) return done(null, false, { message: `Username ${username} not found` })
 		user.comparePassword(password, (err, isMatch) => {
 			if (isMatch) {
 				return done(null, user)
 			} else {
 				return done(null, false, { message: "Invalid username or password" })
 			}

 		})
 	})
 })