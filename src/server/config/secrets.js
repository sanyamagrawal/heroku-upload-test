/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

const secrets = {
	db: process.env.MONGO_URI || "mongodb://localhost/AverPointMERN",
	sessionSecret: "letthisbeyoursecret",
    facebook: {
        'appID' : 'sdfdsfd',
        'appSecret' : 'sdfsdfds',
        'callbackUrl' : 'http://localhost:3000/login/facebook/callback',
        passReqToCallback : true,
        profileFields: ['id', 'emails', 'name'] //This
    },
    mailgun: {
        'key': '',
        'domain': 'mail.averpoint.com'
    }
}

export default secrets