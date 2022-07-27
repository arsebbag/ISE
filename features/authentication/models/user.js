
const { Schema, model } = require('mongoose')

const Person = require('./Person')
const Credentials = require('./Credentials')
//client
// maybe better to use it as an object.
const user = new Schema({
  ...Person,
  ...Credentials,
  role: { type: String, required: true }, //will be 'A' for admin OR 'B' for basic user
  manager: Number //id of manager
});

module.exports = model("User", user);