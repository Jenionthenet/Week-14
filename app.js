const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Task = require('./schema/task')

app.use(cors())
app.use(express.json())

//connect to database
mongoose.connect('mongodb+srv://new_user5:SAHgws1021@cluster0.o8bqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}, (error) => {
    if(error) {
        console.log('Unable to connect to the database!')
    } else {
        console.log('Connected to the database!')
    }
})



app.post('/add-item', (req, res) => {
    const taskName = req.body.taskName
    const taskPriority = req.body.taskPriority
    const completedDate = req.body.completedDate

    const task = new Task({
        taskName: taskName,
        taskPriority: taskPriority,
        completedDate: completedDate
    })
    task.save((error) => {
        if(error) {
            res.json({error: 'Unable to save!'})
        } else {
            res.json({success: true, message: 'Saved new task!'})
        }
    })
})
    

app.get('/tasks', (req, res) => {
     Task.find({}, (error, tasks) => {
         if(error) {
             res.json({error: 'Unable to fetch tasks!'})
         } else {
             res.json(tasks)
         }
     })
}) 


app.delete('/tasks/:taskId', (req, res) => {
     const taskId = req.params.taskId

     Task.remove({
         _id: taskId
     }, (error, result) => {
         if(error) {
             res.json({error: "Unable to delete task"})
         } else {
             res.json({success: true, message: 'Task deleted successfully!'})
         }
     })
})


app.put('/tasks', (req, res) => {
    const taskId = req.body.taskId
    const taskName = req.body.taskName
    const taskPriority = req.body.taskPriority
    const completedDate = req.body.completedDate

    const updatedTask = {
        taskName: taskName,
        taskPriority: taskPriority,
        completedDate: completedDate
    }

    Task.findByIdAndUpdate(taskId, updatedTask, (error, result) => {
        if(error) {
            res.json({error: 'Unable to update'})
        } else {
            res.json({success: true})
        }
    })
})



app.listen(8080, () => {
    console.log("Server is running...")
})