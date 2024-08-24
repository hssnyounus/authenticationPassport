const models = require('../models');
const validator = require('validator');
const {User} = models;

module.exports = async (req,res,next) =>{
    const {name,email,password} = req.body;
    if (!validator.isEmail) {
        return res.send({error:'invalid email'});
      }
    
    if (!email) {
    return res.send({error:'email required'});
    }
    
    if (!name) {
        return res.send({error:'name required'});
      }
    if (!password) {
        return res.send({error:'password required'});
      }
    const user = await User.findOne({
        where:{
            email
        }
    });
    if (user) {
        return res.send({error:'user already exist'})
    }
    next();
}
