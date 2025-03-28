const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'Access Denied. No token provided.' });
        }

        const token = authHeader.replace('Bearer ', '').trim();

        const verified = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verified);
        req.user = verified; 
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid or expired token' });
    }
};

const authorization = (req,res,next) => {
    if(req.user.role !== 'manager'){
        return res.status(400).json({msg:'Access restricted to managers only'});
    }
    next();
}

module.exports = {authenticate, authorization}