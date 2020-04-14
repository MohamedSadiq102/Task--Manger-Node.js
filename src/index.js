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
// this is endpoint to create a User
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

// Endpoint to read from users
app.get('/users', (req,res) => {
    User.find({name : "Mohamed Mostafa"}).then((user)=> {
        res.send(user)
    }).catch((e) =>{
        res.status(500).send(e);
    })
})

//Endpoint to read but more complexed
// when i add /:id after users it means a dynamic value
app.get('/users/:id', (req , res) => {
    // req.params this contains all of the route parameters that we're provided
   const _id =  req.params.id
// monogodb query is not considered a failure if we don't get any result back, that's why we should use if statement
   User.findById(_id).then((user) => {
       if(!user){
           return res.status(404).send()//404 user not found
       }
    res.send(user);
   }).catch((e)=>{
       res.status(500).send(e);
   })

})

    app.get('/tasks/:id',(req,res) => {
        const _id = req.params.id

        Task.findById({_id},).then((task) => {
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
        }).catch((e) =>{
            res.status(500).send()
        })
    })

// Endpoint to create a task
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


