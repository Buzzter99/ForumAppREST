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
    "topic description additionalInfo when who comments likes"
  )
    .populate("who")
    .populate("comments");
  const mappedPosts = posts.map((post) => {
    return {
      ...post.toObject(),
      isOwner: post.who._id.toString() === userId,
      isAuth: userId ? true : false
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
    isAuth: userId ? true : false,
    isLiked: post.likes?.includes(userId) || false,
  };
}

async function deletePost(postId,userId) {
  const post = await ForumPost.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if(post.who._id.toString() !== userId) {
    throw new Error("You cannot delete this post");
  }
  if(post.comments.length > 0) {
    await Comment.deleteMany({ _id: { $in: post.comments } });
  }
  await ForumPost.findByIdAndDelete(postId);
}

async function editPost(postId,{ topic, description, additionalInfo, when, who }) {
  const post = await ForumPost.findById(postId);
  if (!post) {
    throw new Error("Post does not exist!");
  }
  if(post.who._id.toString() !== who) {
    throw new Error("You cannot edit this post");
  }
  if (!topic) {
    throw new Error("Topic field is required");
  }
  if (!description) {
    throw new Error("Description field is required");
  }
  if (!when) {
    throw new Error("Current Date is required");
  }
  await ForumPost.findByIdAndUpdate(postId, {topic,description,additionalInfo, when});
}

async function likePost(postId,userId) {
  const post = await ForumPost.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  if(post.who._id.toString() === userId) {
    throw new Error("You cannot like your own post");
  }
  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }
  await post.save();
}

module.exports = { addPost, getAllPosts, getSinglePost, deletePost , editPost, likePost};
