const router = require('express').Router();
const {addPost} = require('../services/forumService');
const {ApiResponse} = require('../models/ApiResponse');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');

router.post('/add',privateEndpoint, async (req, res) => {
    const post = {
        Topic: req.body.Topic,
        Description: req.body.Description,
        AdditionalInfo: req.body.AdditionalInfo,
        When: new Date().toUTCString(),
        Who: req.user._id
    }
   try {
    await addPost(post);
   } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
   }
   return res.status(200).json(new ApiResponse(200,'Post added successfully!'));
})

module.exports = router