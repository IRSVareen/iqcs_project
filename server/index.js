const express = require('express')
const app = express()
const dbConnection = require('./db')
const PORT = 5000
const cors = require('cors')

// app.use(cors({
//     origin: 'http://localhost:4200',
//     methods: ['GET','POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }))
app.use(cors())
const userRoutes = require('./router/userRoutes')
app.use(express.json())
app.listen(PORT,()=>{
    console.log("working");
})

app.get('/',(req,res)=>{
    res.json("Done")
})

app.use('/api',userRoutes)
dbConnection