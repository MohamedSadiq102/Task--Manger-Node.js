
const mongoose =require('mongoose')
const validator = require('validator')


// monogoose.model accept 2 atgu , 1 -> for name , 2 -> defination
const User = mongoose.model('User', {
    // each value from name , value now are object
    name : {
      type: String, 
      // to make something require which means have to enter name
      required : true,
      trim : true
    }, password : {
        type : String,
        trim : true,
        minlength:7,
       // toLowerCase,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error ('Passord cannot contain password ')
            }  
        }
    },
      email: {
       type: String,
       required : true,
       trim : true,
       lowercase : true,
       validate(value){
           if(!validator.isEmail(value) ){
               throw new Error(' Email is invalid')
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
    }
})

module.exports = User