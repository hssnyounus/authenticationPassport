const models = require('../models');
const validator = require('validator');
const {Subject} = models;

module.exports = async (req,res,next) =>{
    const {name,description} = req.body;
    // if (!validator.isEmail) {
    //     return res.send({error:'invalid email'});
    //   }
    
    // if (!email) {
    // return res.send({error:'email required'});
    // }
    
    if (!name) {
        return res.send({error:'name required'});
      }
    if (!description) {
        return res.send({error:'description required'});
      }
    // const user = await User.findOne({
    //     where:{
    //         email
    //     }
    // });
    // if (user) {
    //     return res.send({error:'user already exist'})
    // }
    next();
}
