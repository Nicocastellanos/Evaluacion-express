const mongoose = require('mongoose')

//schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean,
})

//Model 
const taskModel = new mongoose.model('task', taskSchema);

//export 
module.exports = taskModel;