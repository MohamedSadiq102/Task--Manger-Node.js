const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 

const app = express()
const port = process.env.PORT || 3000   

// to register a new middleware func to run
// with middleware -> do something -> run route handler
// app.use((req, res, next) => {
//     // WE say if get req then don't send anything but everything else is okay
//      if (req.method === 'GET') {
//          res.send(' Get request are disable')
//      }else {
//          next() // without this we couldn't recieve a res 
//      }
// })

// app.use((req, res, next) => {
//     res.status(503).send(' site is currently down ')
// })

// without middleware request -> run route handler
app.use(express.json())
app.use(userRouter) // to see it in webpage
// to customiye our server and express provides
//express.json -> will automatically pass incoming Jason to an Object ,
// so we can access it in our request handlers, make this console.log(req.body) in app.post
// and when u make post from postman u will see it in terminal 
//app.use(express.json())
app.use(taskRouter)



app.listen(port, () =>{   
    console.log('Server is ip on Port '+ port) 
})

const Task = require('./models/task')
const User = require('./models/user')
const main = async () => {
    // task catch users
    // const task = await Task.findById('5ea67b47facc1034632814e7')
    // await task.populate('owner').execPopulate() //its allow us to populate data from rel such as data for owner, which user create which task
    // console.log(task.owner);

    // user catch task
    // const user = await User.findById('5ea678584e3cb233b6eee4a6')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks);
    

}

main()