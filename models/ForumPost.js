const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forumPost = new Schema({
  topic: { type: String, required: [true, "Topic field is required"] },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  additionalInfo: {
    type: String,
    required: [false],
  },
  when: { type: Date, required: [true, "Current Date is required"] },
  who : { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: false }],
});

const Post = mongoose.model("Post", forumPost);
module.exports = Post;
