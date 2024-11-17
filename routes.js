const router = require('express').Router();
const userController = require('./controllers/userController');
const forumPostController = require('./controllers/forumPostController');
router.use('/forumPost',forumPostController);
router.use('/user',userController);
router.all('*', (req, res) => {
    return res.status(404).json({ message: 'Error 404 Page not found' });
})
module.exports = {router};