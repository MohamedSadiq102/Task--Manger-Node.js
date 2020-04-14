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
// good infos : express doesn't return anything we tell express what should return or not throgh re , req
app.post('/users', async (req , res) => {
   const user = new User(req.body)

   try {
     // everything will be saved ot successed or failed 
        await user.save()
        res.status(201).send(user)

   }catch(e){
     res.status(400).send(e)
   }
//    user.save().then(() =>{
//      //  without status we will see status code 200,despite it was created and should return 201
//       res.status(201).send(user)
//    }).catch((e) => {
//      // it tells that's client error, without this we will see status code 200,despite it was failed
//       res.status(400).send(e)
//     //  res.send(e)
//  })

})

// Endpoint to read from users
app.get('/users', async (req,res) => {

    try{
        const users = await User.find({})
        res.send(users)

    }catch(e){
        res.status(500).send(e);
    }
    // for req & res with Promise
    // User.find({name : "Mohamed Mostafa"}).then((user)=> {
    //     res.send(user)
    // }).catch((e) =>{
    //     res.status(500).send(e);
    // })
})

//Endpoint to read but more complexed
// when i add /:id after users it means a dynamic value
app.get('/users/:id', async (req , res) => {
    try{
    // req.params this contains all of the route parameters that we're provided
    const _id =  req.params.id
    const user = await User.findById({_id})
    if(!user){
        return res.status(404).send()//404 user not found
    }
       res.send(user);
    }catch(e){
     res.status(500).send(e);
    }
//    // monogodb query is not considered a failure if we don't get any result back, that's why we should use if statement
//    User.findById(_id).then((user) => {
//        if(!user){
//            return res.status(404).send()//404 user not found
//        }
//     res.send(user);
//    }).catch((e)=>{
//        res.status(500).send(e);
//    })

})

    app.get('/tasks/:id',async (req,res) => {
        const _id = req.params.id

        try{
           const task= await Task.findById({_id})
           if(!task){
            return res.status(404).send()
        }
        res.send(task)
        }catch(e){
            res.status(500).send()
        }

        // Task.findById({_id},).then((task) => {
        //     if(!task){
        //         return res.status(404).send()
        //     }
        //     res.send(task)
        // }).catch((e) =>{
        //     res.status(500).send()
        // })
    })
    // Patch can only with id not all obejcts onetime
     app.patch('/users/:id', async(req, res) =>{
     
   try{
       const user = await User.findOneAndUpdate(req.params.id,/**we don't have to put set because mongoose care about this */ /**{name : "Mohy"} || as body request*/ 
       req.body ,{new : true , runValidators : true /**ffor writing data in database */} /**this optional -> return new user as opposed to the existing one that was found before the update */ )
     
       if (!user) {
           return res.status(404).send() // there is no user
       } else {
           res.send(user)
       }

     }catch(e){
        res.status(400).send(e)
    }

})

// Endpoint to create a task
app.post('/tasks' ,async (req,res) => {
    const task = new Task(req.body)
    try{
         await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)

    }

//     const task = new Task(req.body)
//    task.save().then(() =>{
//        res.status(201).send(task)
//    }).catch((e) => {
//        res.status(400).send(e)
//    })
})

app.listen(port, () =>{   
    console.log('Server is ip on Port '+ port) 
})


