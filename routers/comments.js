const express = require('express');
const router = express.Router();
const comments = require("../schemas/comments")
const jwt = require('JsonWebToken')
const authMiddleware = require('../middlewares/auth_middleware.js');

router.post("/comments/:postId", authMiddleware, async(req, res) => {
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

router.get("/comments/comment/:comId", authMiddleware, async(req, res, next) => {
    const comId = req.params;
    console.log(req.headers)

    // const comId = req.params;
    // const comments = await comments.findOne({ postId: postId });
    const comment = await comments.findOne({ comId : comId });

    if (comment.name != res.locals.user.nickname) {
        res.send ({ errorMessage: "access denied" });

        return;
    }
    res.json({ comments: comment });
});

router.delete("/comments/:postId", authMiddleware, async (req, res, next) => {
    const { postId } = req.params;
    const { comId } = req.body;
    console.log(comId)
    console.log(postId)

    const isCommentInComments = await comments.findOne({ comId: comId });

    // 댓글 작성자가 맞다면
    if (res.locals.user.nickname != isCommentInComments.name) {
        res.send({ errorMessage: "Access denied" });

        return
    } else { await comments.deleteOne({ comId: comId });
    }

    res.send({ })
});  

module.exports = router;