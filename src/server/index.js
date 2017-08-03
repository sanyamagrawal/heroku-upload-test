import fs from "fs"
import express from "express"
//import mongoose from "mongoose"
import bcrypt from "bcrypt-nodejs"
import passport from "passport"
import webpack from "webpack" 
// import config from "../../webpack/webpack.config.dev.js"
import secrets from "./config/secrets" 
import configurePassport from "./config/passport"
import configureExpress from "./config/express"

import settings from "./config/settings-development.js";
const paths = require('../../config/paths');

const app = express()

app.use(express.static(paths.appBuild));

// const connect = () => {
//   mongoose.connect(secrets.db, (err, res) => {
//     if (err) {
//       console.log(`Error connecting to ${secrets.db}. ${err}`)
//     } else {
//       console.log(`Successfully connected to ${secrets.db}.`)
//     }
//   })
// }

// connect();

// mongoose.Promise = Promise; 
// mongoose.connection.on("error", console.error)
// mongoose.connection.on("disconnected", connect)

// -------------Email Verification----------------
//var nev = require('email-verification')(mongoose);
var promisifyAll = require('es6-promisify-all');
//var fs = promisifyAll(require('fs'));
//global.nev = promisifyAll(require('email-verification')(mongoose));

function PromiseError(message) {
  this.name = 'PromiseError';
  this.message = message;
  this.stack = (new Error()).stack;
}
PromiseError.prototype = Object.create(Error.prototype);
PromiseError.prototype.constructor = PromiseError;

// our persistent user model
// import User from './models/users';

configurePassport(app, passport)
configureExpress(app, passport)

// -------------------------------------------


app.get('*', function(request, response) {
  response.sendFile(paths.appHtml);
});

// start listening to incoming requests
app.listen(process.env.PORT || app.get("port"), (err) => {
  if (err) {
    console.err(err.stack)
  } else {
    console.log(`App listening on port ${app.get("port")} [${process.env.NODE_ENV} mode]`)
  }
})
