const express = require('express')
const app = express()
const dbConnection = require('./db')
const PORT = 5000
const http = require('http')
const cors = require('cors')
const socketIo = require('socket.io')
const socketLogic = require('./sockets/socket')
const server = http.createServer(app);

// app.use(cors({
//     origin: 'http://localhost:4200',
//     methods: ['GET','POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }))
app.use(cors())
const userRoutes = require('./router/userRoutes')
app.use(express.json())
server.listen(PORT,()=>{
    console.log("working");
})

app.get('/',(req,res)=>{
    res.json("Done")
})

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:4200", 
      methods: ["GET", "POST"]
    }
  });

app.use('/api',userRoutes)
dbConnection

socketLogic(io)