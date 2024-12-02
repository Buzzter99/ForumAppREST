const Comment = require("../models/Comment");
const ForumPost = require("../models/ForumPost");

async function addComment(postId, msg, userId, date) {
  const post = await ForumPost.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if (post.who._id.toString() === userId) {
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
  const comment = await new Comment({
    message: msg,
    when: date,
    who: userId,
  }).save();
  post.comments.push(comment._id);
  await post.save();
}

async function deleteComment({postId,commentId,userId}) {
  const comment = await Comment.findById(commentId);
  if (!comment) {
      throw new Error("Comment not found");
  }
  if (comment.who._id.toString() !== userId) {
      throw new Error("You cannot delete this comment");
  }
  const post = await ForumPost.findById(postId);
  if (!post) {
      throw new Error("Post not found");
  }
  await Comment.findByIdAndDelete(commentId);
  post.comments.pull(commentId);
  await post.save();
}

async function getCommentById(id,userId) {
    const comment = await Comment.findById(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.who._id.toString() !== userId) {
        throw new Error("You cannot delete this comment");
    }
    return comment;
}

async function editComment({commentId, msg, userId, when}) {
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (!msg) {
        throw new Error("Comment field is required");
    }
    if (comment.who._id.toString() !== userId) {
        throw new Error("You cannot edit this comment");
    }
    await Comment.findByIdAndUpdate(commentId, { message: msg, when });
}

module.exports = { addComment,deleteComment,getCommentById,editComment };
