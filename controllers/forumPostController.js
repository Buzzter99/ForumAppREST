const router = require('express').Router();
const {addPost,getAllPosts,getSinglePost,deletePost} = require('../services/forumService');
const {addComment} = require('../services/commentService');
const {ApiResponse} = require('../models/ApiResponse');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');

router.post('/add',privateEndpoint, async (req, res) => {
    const post = {
        topic: req.body.topic,
        description: req.body.description,
        additionalInfo: req.body.additionalInfo,
        when: new Date().toUTCString(),
        who: req.user._id
    }
   try {
    await addPost(post);
   } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
   }
   return res.status(200).json(new ApiResponse(200,'Post added successfully!'));
})

router.get('/all', async (req, res) => {
    let posts;
    try {
        posts = await getAllPosts(req.user?._id);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(posts);
})

router.get('/:id', async (req, res) => {
    let post;
    try {
        post = await getSinglePost(req.params.id, req.user?._id);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(post);
})

router.post('/addComment',privateEndpoint, async (req, res) => {
    const comment = {
        msg: req.body.msg,
        when: new Date().toUTCString(),
        who: req.user._id
    }
   try {
    await addComment(req.body.postId,comment.msg,comment.who,comment.when);
   } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
   }
   return res.status(200).json(new ApiResponse(200,'Comment added successfully!'));
})

router.delete('/all/:id',privateEndpoint, async (req, res) => {
    try {
        await deletePost(req.params.id,req.user._id);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(new ApiResponse(200,'Post deleted successfully!'));
})
module.exports = router