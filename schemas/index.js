const mongoose = require("mongoose")

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/spa_mall")
    .catch(err => console.log(err))
}

// 몽구스의 연결이 실패할 경우 에러 말해주는거
mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err)
})

module.exports = connect