const mongoose = require('mongoose');

const { Schema } = mongoose;
const postsSchema = new Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    name: {
        type: String,
      },
});

module.exports = mongoose.model("Posts", postsSchema);