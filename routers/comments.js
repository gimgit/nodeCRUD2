const express = require('express');
const router = express.Router();
const comments = require("../schemas/comments");
const jwt = require('jsonwebtoken');
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

router.get("/findComment/:comId", authMiddleware, async(req, res, next) => {
    
    const { comId } = req.params;

    const comment = await comments.findOne({ _id : comId });

    if (comment.name != res.locals.user.nickname) {
        res.send ({ errorMessage: "access denied" });

        return;
    }
    res.json({ comments: comment });
});

router.delete("/comments/:comId", authMiddleware, async (req, res, next) => {
    
    // // const { comId }= req.params;

    // // const isCommentInComments = await comments.findOne({ _id: comId });


    // console.log(isCommentInComments.name)
    // console.log(res.locals.user.nickname)
    // console.log(comId)


    // // 댓글 작성자가 맞다면
    // if (isCommentInComments.name !== res.locals.user.nickname ) {
    //     res.send({ errorMessage: "Access denied" });
    //     return
    // } else { await comments.deleteOne({ _id: comId });
    // }

    const { comId } = req.params;

    const comment = await comments.findOne({ _id : comId });

    if (comment.name !== res.locals.user.nickname) {
        res.send ({ errorMessage: "access denied" });

        return;
    }else { await comments.deleteOne({ _id: comId });
    }
    res.send({ })
});  

router.patch("/patchComment/:comId", authMiddleware, async (req, res, next) => {
    const { comId }= req.params;
    const { comment } = req.body;


    const isCommentInComments = await comments.findOne({ _id: comId });

    if (isCommentInComments) {
        await comments.updateOne({ _id: comId }, {$set: {comment}});
    }

    res.send({ })
})

module.exports = router;