require('../src/db/mongoose')

const Task = require('../src/models/task')

// 5e94403d786e2379362dda2f

Task.findByIdAndDelete('5e9455c5ba5c097c7bbf08b0').then((task) => {
    console.log(task)
    return Task.countDocuments({"description" : "Ko ks"})
}).then((result) =>{
    console.log(result)
}).catch((e) => {
    console.log(e)
})




