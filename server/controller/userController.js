const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getUsers = async(req,res) =>{
    try{
        const users = await Users.find()

        if(users.length === 0) return res.status(400).json({msg:'No Users found'})

        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({msg:'Internal Server Error', err})
    }
}

const addUsers = async(req,res) =>{
    try{
        const {userName, password, role} = req.body
        // console.log(req.body);

        const user = await Users.findOne({userName})
        if(user) return res.status(400).json({msg:'User already exists'})
        

        const validRoles = ['manager', 'operator', 'quality control engineer'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ msg: 'Invalid role' });
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const userCount = await Users.countDocuments();
        // console.log(userCount);
        const userRole = userCount === 0 ? 'manager' : role;

        const newUser =  await Users.create({userName, password: hashPassword, role: userRole})

        res.status(201).json({msg:'User Created Successfully', newUser})
    }
    catch(err){
        res.status(500).json({msg:'Internal Server Error', err})
    }
}

const updateUser = async(req,res) => {
    try{
        const {id} = req.params
        const {password} = req.body

        const user = await Users.findById(id)
        if(!user) return res.status(400).json({msg:'User Does Not exist'})

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        user.password = hashPassword 
        await user.save()

        res.status(200).json({ msg: 'Password updated successfully' });
    }catch(err){
        res.status(500).json({msg:'Internal Server Error', err})
    }
}

const deleteUser = async(req,res) => {
    try{
        const {id} = req.params

        const user = await Users.findById(id)
        if(!user) return res.status(400).json({msg:'User Does Not exist'})

        const deletedUser = await Users.findByIdAndDelete(id)

        res.status(200).json({msg:'User Deleted Successfully', deletedUser})
    }catch(err){
        res.status(500).json({msg:'Internal Server Error', err})
    }
}

const loginUser = async(req,res) => {
    try{
        const {userName, password} = req.body

        const user = await Users.findOne({userName})
        if(!user) return res.status(400).json({msg:'User Does Not exist'})
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'})

        const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: '1h'})
        
        res.status(200).json({msg:'Login Successful', userName: user.userName, role: user.role,token, _id: user._id})
    }catch(err){
        res.status(500).json({msg:'Internal Server Error', err})
    }
}

module.exports = {getUsers, addUsers, updateUser, deleteUser, loginUser}