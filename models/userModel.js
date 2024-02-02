const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

//Model
const userModel = new mongoose.model('user', userSchema);

//Export
module.exports = userModel;


