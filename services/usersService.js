const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const Comment = require('../models/Comment');
const ForumPost = require('../models/ForumPost');
async function registerUser({email,username, password,repeatPassword}) {
    if(password !== repeatPassword) {
        throw new Error('Passwords do not match');
    }
    const existing =  await User.findOne({$or: [{ username: username }, { email: email }]});
    if(existing) {
        throw new Error('Account already exists!');
    }
    await new User({email,username,password}).save();
}
async function loginUser({emailOrUsername, password}) {
   if(!emailOrUsername) {
       throw new Error('Email/Username field is required');
   }
   if(!password) {
       throw new Error('Password field is required');
   }
    const user = await User.findOne({$or: [{ username: emailOrUsername }, { email: emailOrUsername }]});
    if(!user) {
        throw new Error('Wrong email/username or password');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw new Error('Wrong email/username or password');
    }
    const payload = {email: user.email, username: user.username,_id: user._id};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});
    return token;
}
async function getAllUsers() {
    const users = await User.find({},'username email');
    return users;
}

async function getCommentsForUser(userId) {
    const comments = await Comment.find({who: userId}).populate('who');
    const result = [];
    for (let i = 0; i < comments.length; i++) {
        const postId = await ForumPost.findOne({ comments: comments[i]._id });
        result.push({postId: postId._id,comment: comments[i]});

    }
    return result;
}
module.exports = {registerUser,loginUser,getAllUsers,getCommentsForUser};