const Comment = require("../models/Comment");
const ForumPost = require("../models/ForumPost");

async function addComment(postId,msg,userId,date) {
    const post = await ForumPost.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }
    if(post.who._id.toString() === userId) {
        throw new Error("You cannot comment on your own post");
    }
    if (!msg) {
        throw new Error("Comment field is required");
    }
    if (!date) {
        throw new Error("Current Date is required");
    }
    if (!userId) {
        throw new Error("User is required");
    }
    const comment = await new Comment({ message: msg, when: date, who: userId }).save();
    post.comments.push(comment._id);
    await post.save();
}

module.exports = { addComment };