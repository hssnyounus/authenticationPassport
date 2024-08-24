var jwt = require('jsonwebtoken');
var {config} = require('dotenv');
var {User} = require('../models');
config();
module.exports = async(req, res, next)=>{
    if (!req.headers.authorization) {
        return res.status(401).send({error:'Unauthorized'});
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,{expiresIn:'24h'},(error,decoded)=>{
        if (error) {
            return res.status(401).send({error});
        }
        req.decoded = decoded;
        User.findByPk(decoded.userId)
        .then((user)=>{
            if (!user) {
                return res.status(401).send({error:'user does not exist'})
            }
            next();
        })
    })
}