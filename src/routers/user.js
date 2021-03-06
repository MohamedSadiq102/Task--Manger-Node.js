const express = require('express')
const multer = require('multer') // to add file upload to express
const sharp = require('sharp')
const router = new express.Router()
const auth = require('../middleware/auth')
const {sendWelcomeEmail , sendCancelEmail} = require('../emails/account')
const User = require('../models/user')


// to create & from2 1rgu , 1 for path, 2 for callback
// this is endpoint to create a User
// good infos : express doesn't return anything we tell express what should return or not throgh re , req
router.post('/users', async (req , res) => {
     const user = new User(req.body)
 
    try {
      // everything will be saved ot successed or failed 
         await user.save()
         sendWelcomeEmail(user.email, user.name)
         const token = await user.generateAuthToken()
        res.status(201).send({ user , token})
 
    }catch(e){
      res.status(400).send(e)
    }
//     user.save().then(() =>{
//       //  without status we will see status code 200,despite it was created and should return 201
//        res.status(201).send(user)
//     }).catch((e) => {
//       // it tells that's client error, without this we will see status code 200,despite it was failed
//        res.status(400).send(e)
//      //  res.send(e)
//   })
 
 })

 router.post('/users/login', async (req,res) => {
    try {
        // credential -> taking email , password and find user by email & verfied the password
        const user = await User.findbyCredentials( req.body.email , req.body.password)
        //  we work with a collections & need generate a token for specific user & return a promise 
        const token = await user.generateAuthToken()
        res.send({ user , token}) /* send obj with 2 properity*/
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
})
router.post('/users/logoutAll', auth , async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
router.post('/users/logout', auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token // if the current token isn't the one that was used for authentication 
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
        
    }
})

router.get('/users/me', auth ,async (req,res) => {
    res.send(req.user)
})
// Endpoint to read from users
router.get('/users', auth ,async (req,res) => {

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
    router.patch('/users/me',auth ,async(req, res) =>{
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
    
    // const user = await User.findById(req.params.id) // only findbyid not with update because we don't have a spicifc parameter , after middleware auth not more used
   
     // i can't say user.name or  req.body.name ... because i don't know which filed is updated
     // now is dynamic 
    updates.forEach((update) => req.user[update] = req.body[update]) 

     await req.user.save() // this the  where our middleware-methode is going to executed to save our changes

    //    if (!user) { // we don't need it after middleware auth because he is already logged in
    //        return res.status(404).send() // there is no user
    //    }  

      res.status(200).send(req.user)
     } catch(e){
        res.status(400).send(e)
    } 

})

router.delete('/users/me',auth ,async (req,res)=> {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     res.status(404).send()
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// configure multer multi times for another type of data
const upload = multer({
// dest : 'avatars', //destionation, to connect the image with user profile should remove dest because dest 'multer' run before callback
    limits: { // to restrict the File size
        fileSize: 1000000
    },
    fileFilter(req, file ,cb /**callback func */){ // to filter the files which we wan't actually to upload
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('please upload a image with jpg Or jpeg Or png Format'))
          }
          cb(undefined, true) // accept upload
         //   cb(undefined,false) // refuse the upload
        //   cb(new Error('File must be a PDF')) // If error appears
    }
})

router.post('/users/me/avatar', auth , upload.single('avatar'), async (req,res) => {
   const buffer = await sharp(req.file.buffer).resize({width:250, height : 250}).png().toBuffer()
   
    req.user.avatar = buffer 
    await req.user.save() // to use await don't forgett async
    res.send()
},(error, req, res, next) => {
    res.status(400).send({error : error.message})
})

router.delete('/users/me/avatar', auth , async (req,res) => {
    req.user.avatar = undefined
    await req.user.save() // to use await don't forgett async
    res.send()
})

router.get('/users/:id/avatar', async(req,res)=> {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }
        
        res.set( 'Content-Type', 'image/png')
        res.status(404).send()
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router
