const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res , next) => {

    try {
        // token store the actuall value , req.header to access incoming headers, we pass the name of header 
        const token = req.header('Authorization').replace('Bearer ', '') //to remove the beginning portion use replace()
        const decoded = jwt.verify(token , 'thisismynewcourse')
        const user = await User.findOne({ _id : decoded._id, 'tokens.token' :token})// find the auth user, which math with this token
        
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user // add the user to can be access later
        next() // if everything good then route handler run else error
    } catch (e) {
        res.status(401).send({error : 'Please authenticate'})
    }

    // console.log('Auth middleware' );
    // next() // to allow associated root handler to run
    
}

module.exports = auth
