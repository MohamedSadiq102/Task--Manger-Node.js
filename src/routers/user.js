const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('From a new File')
})


// to create & from2 1rgu , 1 for path, 2 for callback
// this is endpoint to create a User
// good infos : express doesn't return anything we tell express what should return or not throgh re , req
router.post('/users', async (req , res) => {
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
router.get('/users', async (req,res) => {

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
router.get('/users/:id', async (req , res) => {

    // req.params this contains all of the route parameters that we're provided
    const _id =  req.params.id

    try{

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

    // Patch can only with id not all obejcts onetime
    router.patch('/users/:id', async(req, res) =>{
        const updates = Object.keys(req.body) // take this Object in and return an array of Strings where each is property
        const allowedUpdates = ['name','email','password','age']
        // if every single update can be found in allowedupdates
        const isValidOperation = updates.every((update) => { // arary Method and takes callback func for every item in array
          return allowedUpdates.includes(update)  // return true or false 
         })

      // const isValidOperation = updates.every((update) => allowedUpdates.includes(update) , -> shortcut
      if (!isValidOperation) {
          return res.status(400).send({ error : 'Invalid updates!' })
      } 

    try{
    //    const user = await User.findByIdAndUpdate(req.params.id,/**we don't have to put set because mongoose care about this */ /**{name : "Mohy"} || as body request*/ 
    //    req.body ,{new : true  /**ffor writing data in database */, runValidators : true }) /**this optional -> return new user as opposed to the existing one that was found before the update */ 
       
    const user = await User.findById(req.params.id)

      // i can't say user.name or  req.body.name ... because i don't know which filed is updated
      // now is dynamic 
    updates.forEach((update) => user[update] = req.body[update]) 

     await user.save() // this the  where our middleware-methode is going to executed to save our changes

       if (!user) {
           return res.status(404).send() // there is no user
       }  

      res.status(201).send(user)
     } catch(e){
        res.status(400).send(e)
    } 

})

router.delete('/users/:id', async (req,res)=> {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
        
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router
