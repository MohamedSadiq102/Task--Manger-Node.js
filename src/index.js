const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// to customiye our server and express provides
//express.json -> will automatically pass incoming Jason to an Object ,
// so we can access it in our request handlers, make this console.log(req.body) in app.post
// and when u make post from postman u will see it in terminal 
app.use(express.json())



// to create & from2 1rgu , 1 for path, 2 for callback
// this is endpoint
app.post('/users', (req , res) => {
   const user = new User(req.body)

   user.save().then(() =>{
     //  without status we will see status code 200,despite it was created and should return 201
      res.status(201).send(user)
   }).catch((e) => {
     // it tells that's client error, without this we will see status code 200,despite it was failed
      res.status(400).send(e)
    //  res.send(e)
   })
})

app.post('/tasks' ,(req,res) => {
   const task = new Task(req.body)

   task.save().then(() =>{
       res.status(201).send(task)
   }).catch((e) => {
       res.status(400).send(e)
   })
})



app.listen(port, () =>{    
    console.log('Server is ip on Port '+ port)
})


