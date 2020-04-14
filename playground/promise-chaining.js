
require('../src/db/mongoose')

const User = require('../src/models/user')


// to use 2 asyc Operations like findByIdAndUpdate & countDocuments
// here we used Promise chaining or nested whoch is so bab
// User.findByIdAndUpdate('5e943a880e2a287859d9aece', { age : 18}).then((user)=> {
//     console.log(user)
//     return User.countDocuments({ age : 1}) // to count how many users 
// }).then((result)=>{
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// here We use async with await instead of cahining Promise
const UpdateAgeAndCount = async (id , age) => {
    const user = await User.findByIdAndUpdate (id ,{age})
    const count = await User.countDocuments({age}) 
    return count
}

UpdateAgeAndCount('5e943a880e2a287859d9aece',9).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})











