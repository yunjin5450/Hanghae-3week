// 몽구스 연결을 위한 코드
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  
//     postsId : {
//       type : Number
//   },
  username : { 
      type : String
  },
  password: {
      type: Number
      
    },
  content: {
      type: String 
  },
  date : {
      type : Date
  }
});

// 모듈 밖으로 보내주는 코드
module.exports = mongoose.model("Comment", commentSchema)