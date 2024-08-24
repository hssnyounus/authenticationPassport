const model = require('../models');
const {hashPassword,createToken} = require('../utils/password');
const {User} = model
module.exports = {
   async alluser(req,res,next){
        try {
            const user = await User.findAll();
            // return console.log(user);
            // return res.status(200).send({user});
            return res.json({user,message:{success:'all user show successfully!'}}) ;
        } catch (error) {
            return next(new Error(error));   
        }
   },
   async signUp(req,res,next) {

       try {
        //    pass2hash(req.body.password) 
           const {name,email,password} = req.body;
           const hash = hashPassword(password);
           const user = await User.create({name,email,password:hash});
           const token = createToken(user);
           return res.status(200).send({token,user,message:{success:"user created"}})
           
       } catch (error) {
           return next(new Error(error));
       }
}, 
          
   async signIn(req,res,next) {
    try {
        const token =  createToken(req.user);
        res.status(200).send({token, user:req.user,message:{success:'login successfully'} })
        // console.log('successfull login'); 
        
    } catch (error) {
        return next(new Error(error));
    } 
     
   },
   
  async  logout(req,res,next) {
        try {
            req.logout();
            req.session.destroy((error)=>{
                if(error){
                    return console.log(error+"not logout");
                    
                }
            });
            res.clearCookie('connect.sid')
            res.status(201).json({message:'user logout'})
            
            
        } catch (error) {
           return next(new Error(error));
        }
   }
   
//    getAll().then((all) => {
//      console.log('all the data')
//    })
}