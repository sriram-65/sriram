const mongoose = require("mongoose")

const DataSchma = new mongoose.Schema({
    title:String,
    description: String,
    pdfPath: String,
    create_at:
    {
        type:Date , 
        default:Date.now()
    },
    comments: [
        {
          username: String,
          content: String,
          date: { type: Date, default: Date.now }
        }
      ]
})

module.exports = mongoose.model("Post" , DataSchma)