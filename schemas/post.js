const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    // postsId : {
    //     type : Number
    // },
    username : { 
        type : String
    },
    password: {
        type: Number
        
      },
    title: {
        type: String
        
    },
    content: {
        type: String
        
    },
    date : {
        type : Date
    }
})

module.exports = mongoose.model("Posts", postSchema)