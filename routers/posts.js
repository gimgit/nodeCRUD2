const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth_middleware.js');
const Posts = require("../schemas/post");

router.post('/posts', authMiddleware, async(req, res) => {
    const title = req.body.title;
    const date = new Date(req.body.date);
    const content = req.body.content;
    const name = res.locals.user.nickname;
    let newPostId = 1;

    try {
        last = await Posts.find({}).sort({postId:-1}).limit(1);
        newPostId = last[0].postId + 1;
    } catch(err) {
        newPostId = 1;
    }

     await Posts.create({ name: name, postId: newPostId, title: title, date: new Date(), content: content });

    res.send({ result: "success" });
})

router.get("/posts", async (req, res, next) => {
    try {
        const posts = await Posts.find({ }).sort("-postId");  
    
        res.json({ posts: posts });  
    } catch (err) {
        console.error(err);
    
        next(err);
    }
  });


  router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await Posts.findOne({ postId: postId });

    res.render('detail.ejs', { data: post });
});

router.get("/posts/:")

module.exports = router;