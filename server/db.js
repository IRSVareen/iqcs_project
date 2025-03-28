const mongoose = require('mongoose')

const dbConnection = mongoose.connect('mongodb://localhost:27017/iqcs',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log('MongoDB Connected Successfully');})
.catch((err)=>{console.error(err)})

module.exports = {dbConnection}