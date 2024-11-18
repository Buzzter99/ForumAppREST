const router = require('express').Router();
const {registerUser,loginUser,getAllUsers} = require('../services/usersService');
const constants = require('../constants');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');


router.get('/all', async (req, res) => {
    let users;
    try {
        users = await getAllUsers();
    } catch (error) {
        return res.status(200).json({message: error.message,statusCode: 400});
    }
    return res.status(200).json(users);
})
router.post('/login', async (req, res) => {
    let token;
    try {
    const { email, password } = req.body;
    token = await loginUser({ email, password });
    } catch (error) {
      return res.status(200).json({message: error.message,statusCode: 400});
    }
    res.cookie(constants.COOKIE_NAME, token, {httpOnly: false,maxAge: 2 * 60 * 60 * 1000});
    return res.status(200).json({message: 'Logged in successfully!',statusCode: 200});
})

router.post('/register', async (req, res) => {
    try {
        const {email,username, password,repeatPassword} = req.body;
        await registerUser({email,username, password,repeatPassword});
    } catch (error) {
        return res.status(200).json({message: error.message,statusCode: 400});
    }
    return res.status(200).json({message: 'Account created successfully!'});
})
router.post('/logout',privateEndpoint, async (req, res) => {
    try {
        res.clearCookie(constants.COOKIE_NAME);
    } catch (error) {
    return res.status(200).json({message: error.message,statusCode: 400});
    }
    return res.status(200).json({message: 'Logged out successfully!'});
});

router.get('/isAuthenticated', async (req, res) => {
    return req.user ? res.status(200).json({status: true,statusCode: 200}) : res.status(200).json({status: false,statusCode: 401});
})
module.exports = router