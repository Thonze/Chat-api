//get user model 
const mongoose = require('mongoose')
const Chat = mongoose.model('chats')


const Home = (app, io) => {

    //normal nodejs

    app.get('/api', async (req,res) =>{
        const chatList = await Chat.find()
        .sort({date: -1})
        .limit(4)
        return res.json({chats: chatList})
    })

    //Socket io part

    io.of('/').on('conncet',  async socket =>{
        console.log('connected')

        socket.on('typing', async msg =>{
            console.log(msg)
            socket.broadcast.emit('typing', {msg: msg.name})
    
        })

        
    
    //msg submit

    try{
        socket.on('msg',async msg =>{
            //When the request come save them
            const chatList = await Chat.find()
            .sort({date: -1})
            .limit(4)
        io.emit('msg', {chats: chatList})
        })

    } catch (err){
        console.error(err.message)
    }

    socket.on('typing', name =>{
        io.emit('typing', {name: `${name.name}`})
    })
    socket.on('disconnect',() =>{
        console.log('Disconnected')
    })
    
    })


}

module.exports = Home