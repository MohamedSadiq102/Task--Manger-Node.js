const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id : userOneId,
    name : 'Mike',
    email: 'mike@example.com',
    password:'oigbndddd',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id : userTwoId,
    name : 'HANS',
    email: 'moe@example.com',
    password:'zuhause099@',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id : new mongoose.Types.ObjectId(),
    description : 'First task',
    compeleted : false,
    owner : userOne._id
}

const taskTwo = {
    _id : new mongoose.Types.ObjectId(),
    description : '  Secound task',
    compeleted : true,
    owner : userOne._id
}

const taskThree = {
    _id : new mongoose.Types.ObjectId(),
    description : ' Third task',
    compeleted : true,
    owner : userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskThree).save()
    await new Task(taskTwo).save()
    await new Task(taskOne).save()

}

module.exports ={
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}