const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


// Endpoint to create a task
router.post('/tasks', auth, async (req, res) => {
    //  const task = new Task(req.body)
    // instead of the will be body with owner property
    const task = new Task({
        // ies 5 spread Operator -> copy all of the properity to this object 
        ...req.body, // req body
        owner: req.user._id // owner have its value fetchend from req
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    //     const task = new Task(req.body)
    //    task.save().then(() =>{
    //        res.status(201).send(task)
    //    }).catch((e) => {
    //        res.status(400).send(e)
    //    })
})

router.get('/tasks', auth, async (req, res) => {
    try {
        //  const task = await Task.find({})
        const task = await Task.find({
            owner: req.user._id
        })
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks)=>{
    // 	res.send(tasks)
    // }).catch((e)=>{
    // 	res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task= await Task.findById({_id})
        const task = await Task.findById({
            _id,
            owner: req._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
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

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperations) {
        return res.status(400).send({   error: 'Invalid Updateds' })
    }

    try {
        //  const task = await Task.findById(req.params.id)
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })


        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)
    }

})


router.delete('/tasks/:id', auth, async (req, res) => {

    try {
   //   const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete( {_id : req.params.id, owner : req.user._id })
        
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

module.exports = router