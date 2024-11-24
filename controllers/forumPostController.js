const router = require('express').Router();
const {addPost} = require('../services/forumService');
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
    console.log(post);
   try {
    await addPost(post);
   } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
   }
   return res.status(200).json(new ApiResponse(200,'Post added successfully!'));
})

module.exports = router