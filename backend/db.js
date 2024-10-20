const mongoose = require("mongoose");
const MONGODBURL = process.env.MONGODBURL;

mongoose.connect(MONGODBURL)

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
})


const Todo  = mongoose.model('Todos',todoSchema);

module.exports = {
    Todo,
}