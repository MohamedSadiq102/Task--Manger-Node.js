const mongoose =require('mongoose')

//const Task = mongoose.model('Task',{
const TaskSchema = new mongoose.Schema({
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
},{
    timestamps : true
})
const Task = mongoose.model('Task', TaskSchema)


module.exports = Task

















