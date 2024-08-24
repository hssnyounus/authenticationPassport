var models = require('../models');
var {Category} = models;

module.exports = {
  async CategoryCreate(req,res,next){
   	try{
   		const {title,description} = req.body;
    	console.log(req.body);
      const category = await Category.create({title,description});
      // console.log(category);
     return res.status(201).send({category,message:{success:"create category successfuly"}})
   	}catch(error){
       next(new Error(error));
   	}
  },
  async fetchAll(req,res,next){
    try{
      // const {title,description} = req.body;
      // console.log(req.body);
      const category = await Category.findAll();
      // console.log(category);
     return res.json({category,message:{success:"show category successfuly"}})
     
    }catch(error){
       next(new Error(error));
    }
  },
 async fetchOne({params},res,next){
    try{
      // const {title,description} = req.body;
      // console.log(req.body);
        const category = await Category.findOne({
        where:{
          
          id: params.id
        }
      });
      console.log(category);
     return res.status(200).json({category})
    }catch(error){
       next(new Error(error));
    }
  },
  async update({body,params},res,next){
    try{
      const {title,description} = body;
      // console.log(req.body);
      const category = await Category.findOne({
        where:{
             id: params.id
      }
      });
      // if(!category) {
      //   return res.status(400).send({error:'no id'})
      // }
      const updatecategory = await Category.update(
        {title,description},
        // {title: body.title || category.title},
        // {description: body.description || category.description},
        { where: { id: params.id } }
      );

      console.log(category);
     return res.status(200).json({updatecategory,category,message:{success:'recordupdated successful;[l,-y'}})
    }catch(error){
       next(new Error(error));
    }
  },
   async recordDelet({body,params},res,next){
    try{
      // const {title,description} = body;
      // console.log(req.body);
      const category = await Category.findOne({
        where:{
             id: params.id
      }
      });
      if(!category) {
        return res.status(400).send({error:'no id'})
      }
      const deletecategory = await category.destroy()
      //   {title,description},
      //   // {title: body.title || category.title},
      //   // {description: body.description || category.description},
      //   { where: { id: params.id } }
      // );

      console.log(category);
     return res.status(200).json({deletecategory,//
        message:{success:'recordDeleted successfuly!'}})
    }catch(error){
       next(new Error(error));
    }
  }

  }