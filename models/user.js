const { Schema } = require('mongoose')

const User = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    passwordDigest: { type: String, required: true }
  },
  { timestamps: true }
)

module.exports = User
