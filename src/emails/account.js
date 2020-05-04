const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from:'mohamed.sadiq@fiware.org',
        subject:'thanks for joining in!',
        text: `Welcome to the app, ${name} Let me know how you get along with the app.`
   
    })
}
const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'mohamed.sadiq@fiware.org',
        subject:'Cancel your Account',
        text: `Thanks for joining our app, ${name}. if there is any feedback please send a message`
    })
}


module.exports = {
    sendWelcomeEmail,  sendCancelEmail
}
// to send individual email
// sgMail.send({
//     to:'mohamed.sadiq@fiware.org',
//     from:'mohamed.sadiq@fiware.org',
//     subject:'this is first mail',
//     text:'I hope that my message reach successfully'
// })


