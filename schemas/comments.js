const { string } = require('joi');
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  postId : Number,
  name: String,
  title: String,
  comment: String,
  date: String,
  user: String
  // postId: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },  
  // name: {
  //   type: String,
  //   required: true,
  // },
  // title: {
  //     type: String,
  // },
  // comment: {
  //     type: String,
  //     required: true
  // },
  // date: {
  //     type: String,
  //   },
  // user: {
  //   type: String,
  // },
});
CommentSchema.virtual('comId').get(function () {
  return this._id.toHexString();
});
CommentSchema.set('toJSON', {
  virtuals: true,
});
module.exports = mongoose.model('Comment', CommentSchema);