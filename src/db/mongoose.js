
const mongoose =require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, { // the data will store when we run only locally but with heroku not
    useNewUrlParser:true,
    useCreateIndex: true ,// this make sure when mongo works with mongoose are in the same index to quickly access
    useUnifiedTopology: true,
    useFindAndModify: false
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