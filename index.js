const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressip = require('express-ip');
const Users = require('./Users');

const PORT = 5000 || process.env.PORT  ;
// const dbURL = 'mongodb://localhost/XORD' ;
const dbURL = 'mongodb+srv://syedebad:ebad123@cluster0-xt32z.mongodb.net/XORD?retryWrites=true&w=majority';

//Init app
const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(expressip().getIpInfoMiddleware);
app.use(bodyParser.json());

// Index Route
// app.get('/',(req,res)=> {
//     res.send('<h2>Hello from node server</h2>');
// })

app.get('/',(req,res)=>{

    Users.findOne({ ip : req.ipInfo.ip })
    .then( result=>{
        if(result){
            Users.findOneAndUpdate({ ip : req.ipInfo.ip },{ $inc:{ count:1 } })
            .then(r=>{
                console.log(r);
                res.status(200).send(`<div>Your IP : ${r.ip}<br>Count : ${r.count}</div>`);
            })
            .catch(err=>{
                console.log(err)
                res.json(err);
            })
        }
        else{
            const newUser = Users({
                count : 1,
                ip : req.ipInfo.ip,
            });
            newUser.save()
            .then( r=>{
                console.log(r);
                res.status(200).send(`<div>Your IP : ${r.ip}<br>Count : ${r.count}</div>`);
            })
            .catch( err=>{
                console.log(err);
                res.json(err);
            })
        }
    }

    )
    .catch( err=>{
        console.log(err);
    });
    
})

//Connect to Mongo DB
mongoose
    .connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch( error => console.log(error));

//Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));