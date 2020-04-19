const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

// Endpoint to create a task
router.post('/tasks' ,async (req,res) => {
      const task = new Task(req.body)
       try{
           await task.save()
           res.status(201).send(task)
        }catch(e){
            res.status(400).send(e)
         }
//     const task = new Task(req.body)
//    task.save().then(() =>{
//        res.status(201).send(task)
//    }).catch((e) => {
//        res.status(400).send(e)
//    })
})

router.get('/tasks',async (req,res)=>{
    try{
         const task = await Task.find({})
         res.status(200).send(task)
    }catch(e){
         res.status(500).send(e)
    }

// Task.find({}).then((tasks)=>{
// 	res.send(tasks)
// }).catch((e)=>{
// 	res.status(500).send()
// })
})

router.get('/tasks/:id',async (req,res) => {
    const _id = req.params.id

    try{
       const task= await Task.findById({_id})
       if(!task){
        return res.status(404).send()
    }
    res.send(task)
    }catch(e){
        res.status(500).send()
    }

    // Task.findById({_id},).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) =>{
    //     res.status(500).send()
    // })
})


router.patch('/tasks/:id', async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = [ 'description', 'compeleted']
const isValidOperations = updates.every((update) => allowedUpdates.includes(update))
 
if(!isValidOperations ){
    return res.status(400).send({ error : 'Invalid Updateds' })
}

try{
   const task = await Task.findByIdAndUpdate(req.params.id , req.body , {new : true , runValidators :true})

//   const task = await Task.findById(req.body.id)

//   updates.forEach((update) => task[update] = req.body[update])
//   await task.save()

    if (!task) {
       return res.status(404).send()
    }  

        res.status(200).send(task)

}catch(e) {
        res.status(400).send(e)
    }

})



router.delete('/tasks/:id' , async (req,res) => {

try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
        res.status(404).send()
    }
    res.send(task)
} catch (e) {
    res.status(400).send(e)
}

})

module.exports = router






