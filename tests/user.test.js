const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId , userOne , setupDatabase } = require('./fixtures/db')


beforeEach( setupDatabase )


test('Should sing up  a new User ', async () => {
   const response = await  request(app).post('/users').send({
        name : 'Eman Mostafa',
        email: 'emanemo991@gmail.com',
        password: 'lokolkklo'
    }).expect(201)

    // Assert that database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response 
   // expect(response.body.user.name).toBe('Eman Mostafa')
   expect(response.body).toMatchObject({
       user : {
           name : 'Eman Mostafa',
           email:'emanemo991@gmail.com'
       },
       token: user.tokens[0].token
   })
   expect(user.password).not.toBe('lokolkklo')
})

test('Should log in Existing User ', async () => {
   const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})


test('Should not login non existent User', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'fdvdfvdfd'
    }).expect(400)
})

test('Should get profile from users list ' , async() => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`) // to set the header we use the method set which takes 2 argus. 1 -> the name of the header we trying to set, second is the value  
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated User ', async ()=> {
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for User', async () => {
     await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated User', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image ', async () => {
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer)) // in equal we check if it is buffer or not 
})

test('Should update the name of User ', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'HANS'
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('HANS')
})

test('Should not update Invalid  User fields ', async () => {
    await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        location: 'HANS'
    })
    .expect(400)
})

test('Should not update unauthenticated  User fields ', async () => {
    await request(app)
    .patch('/users/me')
   // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        name: 'HANS'
    })
    .expect(401)

})


