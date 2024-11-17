const router = require('express').Router();
const {registerUser,loginUser,getAllUsers} = require('../services/usersService');
const constants = require('../constants');
const {privateEndpoint} = require('../middlewares/authenticationMiddleware');


router.get('/All', async (req, res) => {
    let users;
    try {
        users = await getAllUsers();
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
    return res.status(200).json(users);
})
router.post('/login', async (req, res) => {
    let token;
    try {
    const { email, password } = req.body;
    token = await loginUser({ email, password });
    } catch (error) {
      return res.status(400).json({message: error.message});
    }
    res.cookie(constants.COOKIE_NAME, token, {httpOnly: false,maxAge: 2 * 60 * 60 * 1000});
    return res.status(200).json({message: 'Logged in successfully!'});
})

router.post('/register', async (req, res) => {
    try {
        const {email,username, password,repeatPassword} = req.body;
        await registerUser({email,username, password,repeatPassword});
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
    return res.status(200).json({message: 'Account created successfully!'});
})
router.post('/logout',privateEndpoint, async (req, res) => {
    try {
        res.clearCookie(constants.COOKIE_NAME);
    } catch (error) {
    return res.status(400).json({message: error.message});
    }
    return res.status(200).json({message: 'Logged out successfully!'});
});
module.exports = router