const { Schema } = require('mongoose')

const Comic = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creators: { type: Array },
    release_date: { type: Date },
    cover_image: { type: String },
    thumbnail: { type: String },
    creators: { type: Array },
    api: { type: String },
    api_id: { type: Number },
    stack: { type: Schema.Types.ObjectId, ref: 'stacks' }
  },
  { timestamps: true }
)

module.exports = Comic
