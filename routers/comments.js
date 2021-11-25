const express = require('express');
const router = express.Router();
const comments = require("../schemas/comments")
const jwt = require('JsonWebToken')
const authMiddleware = require('../middlewares/auth_middleware.js');

router.post("/comments/:postId", authMiddleware, async(req, res) => {
    console.log('here')
    const comment = req.body.comment;
    // const date = new Date(req.body.date);
    const name = res.locals.user.nickname;
    const user = res.locals.user.userId;
    // const comId = 1;
    const postId = req.params.postId;


     await comments.create({ user: user, postId : postId, name: name, date: new Date(), comment: comment });

    res.send({ result: "success" });
})

router.get("/comments/:postId", async (req, res, next) => {
    const postId = req.params.postId;

    // const comments = await comments.findOne({ postId: postId });
    const comment = await comments.find({ postId : postId });

    res.json({ comments: comment });
});

// router.get("/comments/:postId", )


// router.get('/posts/:title/comment', authMiddleware, async (req, res) => {
//     const { title } = req.params;
//     const comment = await Comment.find({ title }).sort('-date').exec();
//     if (res.locals.user !== null) {
//       const { nickname } = res.locals.user;
//       res.send({ comment: comment, nickname: nickname });
//       return;
//     }
//     res.send({ comment: comment });
//   });

  
module.exports = router;