
require('../src/db/mongoose')

const User = require('../src/models/user')


// to use 2 asyc Operations like findByIdAndUpdate & countDocuments
// u should use Promise chaining or nested whoch is so bab
User.findByIdAndUpdate('5e943a880e2a287859d9aece', { age : 7}).then((user)=> {
    console.log(user)
    return User.countDocuments({ age : 7}) // to count how many users 
}).then((result)=>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})











