var models = require('../models');
var {Product} = models;
var Cart  = require('../cart/cart');
console.log();

// var {Carts} = Cart
module.exports = {
  async create(req,res,next){
   	try{
   		const {title,description,price} = req.body;
    	console.log(req.body);
      const product = await Product.create({title,description,price});
      console.log(product);
     return res.status(201).send({product,messsage:{success:'product successfully!'}})
   	}catch(error){
       next(new Error(error));
   	}
  },
  async addcart(req,res,next){
    try {
        var id = req.params.id;
        var cart  =  Cart(req.session.cart ? req.session.cart : {});
        console.log(cart);
      
        
        var product = await Product.findByPk(id);

        if(!product){
            return res.status(400).send({messsage:'not product'})
        }
        // cart.add(product,product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.status(200).send({cart,product:{messsage:'add to cart successfuly'}});
    } catch (error) {
        return next(new Error(error));
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
