const { Schema, model } = require('mongoose')

const PersonSchema = require('./Person')
const CredentialsSchema = require('./Credentials')
//client

const admin = new Schema({
    ...PersonSchema,
    ...CredentialsSchema,
    
});

module.exports = model("User", user);