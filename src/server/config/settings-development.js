const settings = {
    host: "localhost:3000",
    db: "mongodb://localhost/AverPointMERN",
    sessionSecret: "letthisbeyoursecret",
    facebook: {
        'appID' : 'sdfsdfsf',
        'callbackUrl' : 'http://localhost:3000/login/facebook/callback',
        passReqToCallback : true,
        profileFields: ['id', 'emails', 'name'] //This
    },
    mailgun: {
        'domain': 'mail.averpoint.com'
    }
}

export default settings