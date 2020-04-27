const mongoose =require('mongoose')


const Task = mongoose.model('Task',{
    description : {
       type: String,
       required: true,
       trim: true
    },
        compeleted :  {
        type : Boolean,
        default:false
    },
    owner : {
        type :  mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User' //its allow us to genere a reference to the following user
    }
})

module.exports = Task

















