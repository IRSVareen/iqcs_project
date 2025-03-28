const userController = require('../controller/userController')
const express = require('express')
const {authenticate , authorization} = require('../middleware/auth')
const Users = require('../models/user')

const router = express.Router()

router.get('/users', userController.getUsers)

const checkFirstUser = async (req, res, next) => {
    const userCount =  await Users.find()
    if (userCount.length === 0) {
        return next();
    }
    authenticate(req, res, () => authorization(req, res, next)); 
};
router.post('/add', checkFirstUser, userController.addUsers)
router.post('/login', userController.loginUser)
router.put('/update/:id', userController.updateUser)
router.delete('/delete/:id', authenticate, userController.deleteUser)


module.exports = router