const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 

const app = express()
const port = process.env.PORT    


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

