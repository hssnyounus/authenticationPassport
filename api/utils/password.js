const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var {config} = require('dotenv').config();
const createToken = ({id,email}) => {
   const token = jwt.sign({userId: id,email},process.env.JWT_SECRET,{expiresIn:"24h"});
   return token;
};
const verifyToken = (token)=>{
    const decoded = jwt.verify(token,process.env.JWT_SECRET,{expiresIn:'24h'});
    return decoded;
};

const hashPassword = (password)=>bcrypt.hashSync(password,11);
    


const comparePassword = (password,hash)=> bcrypt.compareSync(password,hash);

module.exports = {
    hashPassword,
    comparePassword,
    createToken,
    verifyToken
}