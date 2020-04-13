
const mongoose =require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser:true,
    useCreateIndex: true ,// this make sure when mongo works with mongoose are in the same index to quickly access
    useUnifiedTopology: true
})





const Task = mongoose.model('Task',{
    description : {
       type: String,
       trim:true,
       required: true,
    },
        compeleted :  {
        type : Boolean,
        default:false
    }
})

// const task = new Task ({
//     description : '  Ko ks',
//     compeleted : true
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((error) =>{
//     console.log(error)  
// })





// // create instnce  from user
// const he = new User({
//      name : '      Nanooi',
//      email : 'mIIke@gmail.com',
//      password : '  right'
//     // age : 23
// })
// // to store in database
// he.save().then(() =>{
//    console.log(he);
// }).catch((error) => {
//   console.log('Error! ', error)
// })