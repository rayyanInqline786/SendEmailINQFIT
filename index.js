let nodemailer = require('nodemailer');
let express = require('express');
let app = express()
let PORT = process.env.PORT || 3002;
let path = require('path')
let bodyParser = require('body-parser')
let cors = require('cors')

app.use(bodyParser())
app.use(cors())
app.use(express.json());

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"sales@inqline.com",
        pass:"salesinqline786"
    }
})

app.post('/email', (req, res) => {
    //Send an email here but currently dummy email
    console.log(req.body)
    res.json({message: 'Message received!'})
    
    let mailOptions = {
        from:"sales@inqline.com",
        to:'sales@inqline.com, ron@inqline.com',
        subject:`New Request for Invite Received from ${req.body.email} on Inqline Fit`,
        // text:req.body.text
        html:`<p>A new request for an invite is received from ${req.body.name} on Inqline Fit.</p>
        <strong>Details of the sender</strong> <br>
        <p>Name: ${req.body.name}</p> 
        <p>Email Address: ${req.body.email}</p>
        <p>Phone: ${req.body.phone}</p>
        <br>
        <p>This e-mail was sent from a contact form on Fit (http://inqlinefit.com)</p>
        `,
        replyTo:req.body.email
    }
    transporter.sendMail(mailOptions, (error, info)=>{

        if(error){
            console.log(error)
        }
        else{
            console.log("Success"+info.response)
        }
    })

});

app.get('/', function(req, res) {
    res.send("Server Running");
});


app.listen(PORT)