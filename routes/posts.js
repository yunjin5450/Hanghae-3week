const express = require("express");
const Posts = require("../schemas/post.js");
const router = express.Router();


// 게시글 작성 POST 
router.post("/posts", async (req, res) => {
    const {username, password, title, content} = req.body
    let now = new Date()
    
    const createdPosts = await Posts.create({ username : username, password : password, title : title, content : content, date: now })

    res.json({posts : createdPosts})

});


// 게시글 조회 GET 
router.get("/posts", async (req, res) => {
    const postA = await Posts.find().sort({ date: -1 })
    const postB = [];
    for (let i = 0; i < postA.length; i++) {
        postB.push({
            postId: postA[i]._id.toString(),
            username: postA[i].username,
            title: postA[i].title,
            content: postA[i].content,
            date : postA[i].date
        });
    }

    res.json({ postB });

})

// 게시글 상세 조회 GET 
router.get("/posts/:postsId", async (req, res) => {
    const {postsId} = req.params
    const posts = await Posts.find({_id : postsId})

    // if(!posts.length){
    //     return res.json({message : "게시글이 없습니다."})
    // }
    // console.log(req.params)

        const post = posts.map((post) => {  //posts.map(post)의 (post)는 일회용변수라 (a)를 넣어서 변경해 줘도 된다.  
        username = post.username,
        title = post.title, 
        content = post.content, 
        date = post.date,
        _id = post._id

        return{"username" : username, "title" : title, "content" : content, "date" : date, "_id" : post._id}
    })     
    res.json({post : post})
})




// 게시글 수정 PUT
router.put("/posts/:postsId", async (req, res) => {
    const {postsId} = req.params
    const {username, password, title, content} = req.body

    const postF = await Posts.find({ _id: postsId });
    // console.log(currentPost)

    const db_password = postF[0]["password"];
    if (password !== db_password) {
        res.json({ message: "비밀번호가 일치하지 않습니다" })
    } else {
        await Posts.updateOne(
    { _id: (postsId)},
    {$set:{ password: password, title: title, content: content}}
    );
    
    res.json({ "message" : "게시글이 수정하였습니다." })
    }
   
})




// 게시글 삭제 DELETE
router.delete("/posts/:postsId", async (req, res) => {

    const {postsId} = req.params
    const {password} = req.body

    const postF = await Posts.find({ _id : postsId})
    // if (!postF.length) {
    //     return res.json({ message: "게시글이 없습니다." })
    // }
    
    const db_password = postF[0]["password"];
    if (password !== db_password) {
        res.json({ message: "비밀번호가 일치하지 않습니다" })
    } else {
        await Posts.deleteOne({_id: postsId,})

        res.json({ message: "게시글을 삭제하였습니다." })
    }
})

module.exports = router