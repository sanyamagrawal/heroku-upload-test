/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

const MONGO_STAGING_URL = 'mongodb://heroku_621f7rcm:6j7eduqpk3hji6dp9hcpppbpt7@ds157278.mlab.com:57278/heroku_621f7rcm';


const secrets = {
	db: MONGO_STAGING_URL || process.env.MONGO_URI || "mongodb://localhost/AverPointMERN",
	sessionSecret: "letthisbeyoursecret",
    facebook: {
        'appID' : '775304735972697',
        'appSecret' : 'dcf35020e26b397f2292ee4d74e05a8f',
        'callbackUrl' : 'http://localhost:3000/login/facebook/callback',
        passReqToCallback : true,
        profileFields: ['id', 'emails', 'name'] //This
    },
    mailgun: {
        'key': 'key-8c8446d1979a18aa08d79aac11435a3b',
        'domain': 'mail.averpoint.com'
    }
}

export default secrets