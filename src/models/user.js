
const mongoose =require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')
// thw pass objrct is defines all properties for that schema  
const userSchema = new mongoose.Schema({
     // each value from name , value now are object
     name : {
        type: String, 
        // to make something require which means have to enter name
        required : true,
        trim : true
      }, 
      password : {
          type : String,
          trim : true,
          minlength:7,
          validate(value){
              if(value.toLowerCase().includes('password')){
                  throw new Error ('Passord cannot contain password ')
              }  
          }
      },
      age : {
         type: Number,
         default : 0, // if the User doesn't enter age 0 will be default
         validate(value){
             // if in creation haven't entered age NP, Only when enter Age will work
             if(value < 0){
                 throw new Error ('Age must be greater than 0 ')
             }
         }
      },
      email: {
        type: String,
        required : true,
        trim : true,
        lowercase : true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value) ){
                throw new Error(' Email is invalid')
            }
        }
     },
     tokens : [{
         token :{
          type:  String,
         required : true
         } 
     }]
 }, {
     timestamps : true
 })


    // 2 argus -> name & set up an object
    userSchema.virtual('tasks', {
        ref: 'Task',
        localField:'_id',
        foreignField : 'owner'
    })

    //use the method to hide password in the body, if there is any other name except toJSON then we should but it in userhandler like user.anotther-name ()
    userSchema.methods.toJSON = /** if i add async it will return empty user */ function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
    
    }

    // methode to accessible on instances methods
    userSchema.methods.generateAuthToken = async function () {
      const user = this
      const token = jwt.sign({_id : user._id.toString()/**to convert that to standard String */ } , 'thisismynewcourse')
      
      user.tokens = user.tokens.concat({ token })
      await user.save()

      return token

    }
  

    userSchema.statics.findbyCredentials = async (email, password) => {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to login ')
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login ')
        }

        return user
    }


// used a method on user schema to set the middleware up (there are pre and post) , hash password berfore saving
// we are pass to arguments,1 is the name of the event, 2 is standard funct to run not a error-func
userSchema.pre('save',async function (next) {
    const user = this

    if (user.isModified('password')) {
        // we taken the plain text-password & hashing it then using that hash value to override the plain text value
        user.password = await bcrypt.hash(user.password, 8)
    }
    // without calling next() wouldn't finish because it thought that there is some code is still running
    next()
})

// Delete user tasks when user removed
userSchema.pre('remove', async function (next ){
    const user = this
    await Task.deleteMany({ owner : user._id})
    next()
})
// monogoose.model accept 2 atgu , 1 -> for name , 2 -> defination for user || schema
const User = mongoose.model('User', userSchema)
   
module.exports = User

