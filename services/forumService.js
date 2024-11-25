const ForumPost = require("../models/ForumPost");
const Comment = require("../models/Comment");

async function addPost({ topic, description, additionalInfo, when, who }) {
  if (!topic) {
    throw new Error("Forum topic is required");
  }
  if (!description) {
    throw new Error("Forum description is required");
  }
  if (!when) {
    throw new Error("Forum creation date is required");
  }
  if (!who) {
    throw new Error("Forum creator is required");
  }
  await new ForumPost({ topic, description, additionalInfo, when, who }).save();
}
async function getAllPosts(userId) {
  const posts = await ForumPost.find(
    {},
    "topic description additionalInfo when who comments"
  )
    .populate("who")
    .populate("comments");
  const mappedPosts = posts.map((post) => {
    return {
      ...post.toObject(),
      isOwner: post.who._id.toString() === userId,
    };
  });
  return mappedPosts;
}

async function getSinglePost(postId, userId) {
  const post = await ForumPost.findById(postId)
    .populate("who")
    .populate({
      path: "comments",
      populate: { path: "who", model: "User" },
    });
  return {
    ...post.toObject(),
    isOwner: post.who._id.toString() === userId,
  };
}

module.exports = { addPost, getAllPosts, getSinglePost };
