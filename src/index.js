const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user') 
const taskRouter = require('./routers/task') 

const app = express()
app.use(express.json())

// to see it in webpage
app.use(userRouter)

const port = process.env.PORT || 3000   

// to customiye our server and express provides
//express.json -> will automatically pass incoming Jason to an Object ,
// so we can access it in our request handlers, make this console.log(req.body) in app.post
// and when u make post from postman u will see it in terminal 
//app.use(express.json())


app.use(taskRouter)

app.listen(port, () =>{   
    console.log('Server is ip on Port '+ port) 
})

const bycrypt = require('bcrypt')

const myFunction = async () => {
   
    const password ='Rot12345!'
     //hashed-method and return a Promise
    // takes 2 argu, 1 is text password, 2 is number of rounds we wanna run to perform ,
    // which said how many times the hashing algorith is executed 
    // 2 will be easy to crack , 16 take a long time 
     const hashedPawword = await bycrypt.hash(password, 8)

     console.log(password);
     console.log(hashedPawword);
     // when we're logging in we should match the passwords togother 
     const isMatch = await bycrypt.compare('rot12345!',hashedPawword)
     console.log(isMatch);
     
     
}
// without calling there is no Output
myFunction()

