const router = require('express').Router();
const {registerUser,loginUser,getAllUsers,getCommentsForUser, updateUserInfo, signToken} = require('../services/usersService');
const {deleteComment,getCommentById,editComment} = require('../services/commentService');
const constants = require('../constants');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');
const {ApiResponse} = require('../models/ApiResponse');

router.get('/all', async (req, res) => {
    let users;
    try {
        users = await getAllUsers();
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(users);
})

router.get('/edit/comment/:id',privateEndpoint, async (req, res) => {
    let comment;
    try {
        comment = await getCommentById(req.params.id,req.user._id);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(comment);
})

router.post('/edit/comment/:id',privateEndpoint, async (req, res) => {
    const comment = {
        msg: req.body.msg,
        when: new Date().toUTCString(),
        who: req.user._id
    }
   try {
    await editComment({commentId: req.params.id, msg: comment.msg, userId: comment.who, when: comment.when});
   } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
   }
   return res.status(200).json(new ApiResponse(200,'Comment Edited successfully!'));
})



router.get('/comments',privateEndpoint, async (req, res) => {
    let comments;
    try {
        comments = await getCommentsForUser(req.user._id);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(comments);
})

router.delete('/comments/:postId/:commentId',privateEndpoint, async (req, res) => {
    let comment = {
        postId: req.params.postId,
        commentId: req.params.commentId,
        userId: req.user._id
    };
    try {
        comment = await deleteComment(comment);
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(new ApiResponse(200,'Comment deleted successfully!'));
})
router.post('/login', async (req, res) => {
    let token;
    try {
    const { emailOrUsername, password } = req.body;
    token = await loginUser({ emailOrUsername, password });
    } catch (error) {
      return res.status(200).json(new ApiResponse(400, error.message));
    }
    res.cookie(constants.COOKIE_NAME, token, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000,sameSite: 'strict'});
    return res.status(200).json(new ApiResponse(200,'Logged in successfully!'));
})

router.post('/register', async (req, res) => {
    try {
        const {email,username, password,repeatPassword} = req.body;
        await registerUser({email,username, password,repeatPassword,when: new Date().toUTCString()});
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(200).json(new ApiResponse(200, 'Account created successfully!'));
})
router.post('/logout',privateEndpoint, async (req, res) => {
    try {
        res.clearCookie(constants.COOKIE_NAME);
    } catch (error) {
    return res.status(200).json(new ApiResponse(400,error.message));
    }
    return res.status(200).json(new ApiResponse(200,'Logged out successfully!'));
});

router.get('/isAuthenticated', async (req, res) => {
    return req.user ? res.status(200).json(new ApiResponse(200,`Hello, ${req.user.email}`)) : res.status(200).json({statusCode: 401, message: 'Not authenticated'});
})

router.get('/info',privateEndpoint, async (req, res) => {
    return res.status(200).json(req.user);
})

router.post('/update',privateEndpoint, async (req, res) => {
    try {
        const {username,email, oldPassword,newPassword,confirmNewPassword} = req.body;
        await updateUserInfo(req.user._id,{email,username, oldPassword,newPassword,confirmNewPassword,when: new Date().toUTCString()});
        const newTokenInfo = await signToken({username,email,_id: req.user._id});
        res.cookie(constants.COOKIE_NAME, newTokenInfo, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000,sameSite: 'strict'});
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    
    return res.status(200).json(new ApiResponse(200, 'Account updated successfully!'));
})
module.exports = router