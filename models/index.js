const { model } = require('mongoose')
const UserSchema = require('./user')
const StackSchema = require('./stack')
const ComicSchema = require('./comic')

const User = model('users', UserSchema)
const Stack = model('stacks', StackSchema)
const Comic = model('comics', ComicSchema)

module.exports = {
  User,
  Stack,
  Comic
}
