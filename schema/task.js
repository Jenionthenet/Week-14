const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({
    taskName: String,
    taskPriority: String, 
    completedDate: Date
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task