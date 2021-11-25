const { string } = require('joi');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId : Number,
  name: String,
  title: String,
  comment: String,
  date: String,
  user: String
});
CommentSchema.virtual('comId').get(function () {
  return this._id.toHexString();
});
CommentSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('Comment', CommentSchema);