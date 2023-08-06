const { Schema, model, models } = require('mongoose');

const PostSchema = new Schema({
 body: {
    type: String,
    required: true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String
  }
})
module.exports = models.Post || model('Post', PostSchema)