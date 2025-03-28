const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['manager', 'operator', 'quality control engineer'],
        default: 'operator' 
    }
})

const Users = new mongoose.model('Users', userSchema)
module.exports = Users