const express = require("express")
const connect = require("./schemas/index")
const app =express()
const port =3000
const postsRouter=require("./routes/posts.js")
const commentRouter =require("./routes/comments.js")

connect()

app.use(express.json())

app.use("/api",[postsRouter, commentRouter])

app.get('/', (req,res)=>{
    res.send("열려용?")
    
})
app.listen(port, () => {
    console.log(port," 포트로 서버가 켜짐~")
})