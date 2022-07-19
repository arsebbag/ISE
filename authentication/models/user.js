
const { Schema, model } = require('mongoose')

const PersonSchema = require('./Person')
const CredentialsSchema = require('./Credentials')
//client

const user = new Schema({
  ...PersonSchema,
  ...CredentialsSchema,
  balance: {
    type: Number,
    required: true
  },
  manager: Number //id of manager
});

module.exports = model("User", user);

