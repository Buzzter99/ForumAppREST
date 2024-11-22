const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const comment = new Schema({
    message: { type: String, required: [true, "Comment field is required"] },
    when: { type: Date, required: [true, "Current Date is required"] },
    who: { type: Schema.Types.ObjectId, ref: "User", required: [true, "User is required"] },
});

const Comment = mongoose.model("Comment", comment);
module.exports = Comment;
