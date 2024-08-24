const  models = require('../models');
const {hashPassword,createToken} = require('../utils/password');

const  {Productseller} = models;

module.exports = {
//   async create(req,res,next){
      async create({ body, decoded},res,next){
   	try{
   		// const data = {
        //        name:req.body.name,
        //        price:req.body.price
               
        //     }
            //  = body;
        const {name,price} = body
        const {userId} = decoded;
    	console.log(body);
      const productseller = await Productseller.create({name,price,userId});
    //   const productseller = await Productseller.create({data,userId});
    //  return console.log(productseller);
     return res.status(201).send({productseller,messsage:{success:'product successfully!'}})
   	}catch(error){
       next(new Error(error));
   	}
  },

   fetchAll(req,res,next){
    // try{
      // const {title,description} = req.body;
      // console.log(req.body);
      const product =  Product.findAll().then(product=>{
        // return console.log(product);
        return res.status(200).json({product})
        
      }).then((product2)=>{
        return console.log(product2);
        
      }).catch((err)=>{
        console.log(err);
        
      });
      // console.log(product);
    // }catch(error){
    //    next(new Error(error));
    // }
  },

   async RecordDelete({body,params},res,next){
    try{
      // const {title,description} = req.body;
      // console.log(req.body);
      const product = await Product.findOne({
        where:{
          id: params.id
        }
      }) ;
      console.log(product);
      if (!product) {
        return res.status(404).send({product,messsage:{error:"no record"}});
      }
      //else{
        const deleteProduct = await product.destroy();
        console.log(deleteProduct);
        return res.status(200).send({deleteProduct,messsage:{success:"delete Product"}});
      //}
     return res.status(200).json({product})
    }catch(error){
       next(new Error(error));
    }
  }
}
