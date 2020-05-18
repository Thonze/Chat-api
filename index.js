const express = require('express')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/chat-app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response =>{
        console.log('mongoDB connected successfully.');
    }).catch(err =>{
        console.log('Database connection failed.');
    })


    //Models
    require('./model/chat')

    app.use(express.static(__dirname + "'public"))

    //Port to listen 
    const port = process.env.PORT || 5000;

    const expressServer = app.listen(port, () =>{
        console.log(`App started at port $(port)`)
    })

    
    //Listen Socketio to our express app
    const io = socketio(expressServer)

 //routes
 const Home = require('./routes/Home')

 //Get Requests
 //Pass app and io to used them in Home.js
 Home(app,io)