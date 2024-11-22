const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forumPost = new Schema({
  Topic: { type: String, required: [true, "Topic field is required"] },
  Description: {
    type: String,
    required: [true, "Description field is required"],
  },
  AdditionalInfo: {
    type: String,
    required: [false],
  },
  When: { type: Date, required: [true, "Current Date is required"] },
  Who : { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
  Comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: false }],
});

const Post = mongoose.model("Post", forumPost);
module.exports = Post;
