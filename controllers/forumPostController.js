const router = require('express').Router();
const {addPost,getAllPosts} = require('../services/forumService');
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

module.exports = router