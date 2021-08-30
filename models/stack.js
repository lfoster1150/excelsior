const { Schema } = require('mongoose')

const Stack = new Schema(
  {
    name: { type: String, required: true },
    thumbnail: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'users' }
  },
  { timestamps: true }
)

module.exports = Stack
