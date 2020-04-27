
// // in index file 
// // const bycrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//    // to create a new json-web-token should use func sign
//    // rakes 2 argu 1 -> object , 2  -> string , retun our token , 3 is optional
//    const token = jwt.sign({ _id:'abc123' }, 'thisismynewcourse',
//     /** expire them after a specific time */{expiresIn : '7 days' } )
//     console.log(token);
    
//     // 2 argu , 1 -> token and 2 -> is secret to used, return the payload for token, if the 2 string not idetical then will be wrong
//     const data = jwt.verify(token,'thisismynewcourse' )
//     console.log(data);
    



//     /*
//     const password ='Rot12345!'
//      //hashed-method and return a Promise
//     // takes 2 argu, 1 is text password, 2 is number of rounds we wanna run to perform ,
//     // which said how many times the hashing algorith is executed 
//     // 2 will be easy to crack , 16 take a long time 
//      const hashedPawword = await bycrypt.hash(password, 8)

//      console.log(password);
//      console.log(hashedPawword);
//      // when we're logging in we should match the passwords togother 
//      const isMatch = await bycrypt.compare('rot12345!',hashedPawword)
//      console.log(isMatch);
//      */
     
// }
// // without calling there is no Output
// myFunction()


// const pet = {
//     name:'Mail'
// }

// pet.toJSON = function(){
//     console.log(this);    
// }

// console.log(pet);
// console.log(JSON.stringify(pet));