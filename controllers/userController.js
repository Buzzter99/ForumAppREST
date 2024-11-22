const router = require('express').Router();
const {registerUser,loginUser,getAllUsers} = require('../services/usersService');
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
router.post('/login', async (req, res) => {
    let token;
    try {
    const { email, password } = req.body;
    token = await loginUser({ email, password });
    } catch (error) {
      return res.status(200).json(new ApiResponse(400, error.message));
    }
    res.cookie(constants.COOKIE_NAME, token, {httpOnly: true,maxAge: 2 * 60 * 60 * 1000});
    return res.status(200).json(new ApiResponse(200,'Logged in successfully!'));
})

router.post('/register', async (req, res) => {
    try {
        const {email,username, password,repeatPassword} = req.body;
        await registerUser({email,username, password,repeatPassword});
    } catch (error) {
        return res.status(200).json(new ApiResponse(400, error.message));
    }
    return res.status(201).json(new ApiResponse(201, 'Account created successfully!'));
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
module.exports = router