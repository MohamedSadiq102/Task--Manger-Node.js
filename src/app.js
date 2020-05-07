
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 

const app = express()

// without middleware request -> run route handler
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app

