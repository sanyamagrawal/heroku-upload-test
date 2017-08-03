// Defining a User Model in mongoose
// Code modified from https://github.com/sahat/hackathon-starter
import bcrypt from "bcrypt-nodejs"
import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
	username: {
        type: String,
        unique: true
    },
    email: { 
		type: String,
		unique: true,
		lowercase: true
	},
	password: String,
	fb: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        username: String,
        displayName: String,
        lastStatus: String
    },
    score: {
        readScore: {type: Number, default: 0},
        reviewScore: {type: Number, default: 0},
        writeScore: {type: Number, default: 0},
        totalScore: {type: Number, default: 0},
        level: {type: Number, default: 0}
    }	
})

/**
 * Password hash middleware.
 */
UserSchema.pre("save", function(next) {
	var user = this
	if (!user.isModified("password")) return next()
	bcrypt.genSalt(5, (err, salt) => {
		if (err) return next(err)
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

/*
 Defining our own custom document instance method
 */
 UserSchema.methods = {
 	comparePassword: function(candidatePassword, cb) {
 		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
 			if (err) return cb(err)
 			cb(null, isMatch)
 		})
 	}
 }

/**
* Statics
*/
UserSchema.statics = {}

export default mongoose.model("Users", UserSchema)

