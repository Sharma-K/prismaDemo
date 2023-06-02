const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const  {createPost, editPost, deletePost,getPosts} = require('../controllers/post')
router.route('/create').post(isLoggedIn, createPost);
router.route('/update/:id').put(isLoggedIn, editPost);
router.route('/delete/:id').delete(isLoggedIn, deletePost);
router.route('/get').get(isLoggedIn, getPosts);

module.exports = router;