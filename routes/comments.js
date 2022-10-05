const express = require("express");
const Posts = require("../schemas/post")
const Comment = require("../schemas/comment");
const router = express.Router();

// 댓글 생성 POST 
router.post("/comments/:postsId", async (req, res) => {
    const {postsId} = req.params
    const {username, password, content} = req.body
    let now = new Date()


    await Posts.find({ _id : postsId })
    if (!content.length) {
        return res.json({ message: "댓글 내용을 입력해주세요." })
    }
    await Comment.create({
        username : username,
        password : password, 
        content : content, 
        date: now 
        })

    res.json({ message : "댓글작성완료" });
})



// 댓글을 목록 보기 GET 
router.get("/comments/:commentId", async (req, res) => {
    //const {commentId} = req.params
    
    //const commentsB = await Comment.find({_id : commentId}) 
    // if(!commentsB.length){
    //     return res.json({message : "댓글이 없다앙~ 개어렵네"})
    // }
    //console.log(req.params)

    const commentsC = await Comment.find().sort({ date: -1 })
    const commentsD = [];
    for (let i = 0; i < commentsC.length; i++) {
        commentsD.push({
            commentId: commentsC[i]._id.toString(),
            username: commentsC[i].username,
            content: commentsC[i].content,
            date : commentsC[i].date
        })
    }
    res.json({commentsD : commentsD})
    })


// 댓글 수정 PUT

router.put("/comments/:commentId", async (req, res) => {

    const {commentId} = req.params

    console.log(commentId)
    const {content} = req.body

    await Comment.find({ commentId : commentId })
    if (!content.length){
        return res.json({ message: "댓글 내용을 입력해주세요." })
    } else{   
        await Comment.updateOne(
        {_id: commentId, },
        {$set: {content: content,},
        }
        )
        
        res.json({ message : "댓글수정완료" })
    }

    // if (comments.length) {
    //     return res.json({ message: "댓글 내용을 입력해주세요." })
    // }
    //console.log(req.params)

})


// 댓글 삭제 DELETE
router.delete("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params
    //const { password } = req.body
    
    // const comments = await Comment.find({ _id : commentId })
    // if (!comments.length) {
    //     return res.json({ message: "해당 댓글이 없습니다." })
    // }
    //console.log(req.params)

    // const db_password = comments[0]["password"];
    // if (db_password !== password) {
    //     return res.json({ message: "비밀번호를 확인부탁~" })
    // } else {
    //     await Comment.deleteOne({ _id: commentId })

    //     return res.json({ message: "댓글을 삭제해쓔~" })
    // }
    await Comment.deleteOne({ _id: commentId })
    return res.json({ message: "댓글을 삭제했습니다." })
})
    module.exports = router