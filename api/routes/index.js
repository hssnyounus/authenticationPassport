var models = require('../models');
var session  = require('express-session');
var {Product} = models;
var Cart = require('../cart/Cart');
const multer = require('multer')
const passportmiddleware = require('../middleware/passport');
const authorized = require('../middleware/authorization');
const validator = require('../middleware/authmiddleware');
const subjectmiddleware = require('../middleware/subjectmiddleware');
const upload = require('../middleware/fileupload');
// console.log(fileupload.single())
const passport = require('passport');
const passportSignIn = passport.authenticate('local', { session: false });
const {Router} = require('express');
const router = Router();

const authController = require('../controllers/userController');
const categoryController = require('../controllers/categoryController');
const productController = require('../controllers/productController');
const titleController = require('../controllers/titleController');
const studentController = require('../controllers/studentController');
const subjectController = require('../controllers/subjectController');
const uploadController = require('../controllers/uploadController');
const productsellerController = require('../controllers/productsellerController');
// var storage = multer.diskStorage({
// imageFilter:(req,file,cb) =>{
//     if(file.mimetype.startsWith('image')){
//         cb(null,true);
//     }else{
//         cb('please upload image only image type',false);
//     }

// },

//     destination: (req,file,cd) =>{
//         cd(null,'./upload/images');
//     },
//     filename: (req,file,cd) =>{
//         cd(null,Date.now()+file.originalname)
//     },
// });

// var fileupload = multer({storage:storage});

module.exports.routes = (app) => {
	app.get('/',(req,res)=>res.send('hello world'));
	// app.get('/alluser',authController.allUser);

    app.post('/api/auth',validator, authController.signUp);
    // app.post('/api/login',passport.authenticate('local',{session:false}),authController.signIn)
    app.post('/api/login',passportSignIn, authController.signIn )
    app.get('/api/logout',authController.logout);
    app.get('/api/alluser',authController.alluser);

    
    app.get('/api/allcategory',categoryController.fetchAll);
    app.post('/api/addcategory',categoryController.CategoryCreate);
    // app.get('/api/oneCategory/:id?',categoryController.fetchOne);
    app.put('/api/oneCategory/:id',categoryController.update);
    // app.delete('/api/oneCategory/:id?',categoryController.recordDelet);


	app.post('/api/addproduct',productController.create);
	// app.get('/api/allproduct',productController.fetchAll);
    // app.delete('/api/oneproduct/:id?',productController.RecordDelete);
    
    // app.get('/api/add-to-cart/:id',productController.addcart);
    
    app.post('/api/create-title',titleController.create);

  
    app.post('/api/createstudent',studentController.create);
    app.get('/api/allstudent',studentController.getAll);
    app.get('/api/onestudent/:studentid',studentController.getById);
    app.put('/api/editstudent/:id',studentController.recordUpdate);
    app.delete('/api/onestudentdelete/:id',studentController.deleterecord);



    app.post('/api/createsubject',subjectmiddleware, subjectController.create);
    app.get('/api/allsubject',subjectController.getAll);
    app.get('/api/onesubject/:id',subjectController.getById);
    app.put('/api/editsubject/:id',subjectController.recordUpdate);
    app.delete('/api/deletesubject/:id',subjectController.deleterecord);
    // app.post('/api/upload', fileupload.single('image'),async(req,res,next)=>{
    //     try{
            
    //     const image = req.file.filename;
    //     const uploadimage = await Image.create({
    //         // image:req.file.filename
    //         image
    //     });
    //     console.log(req.file);
    //     return res.status(201).json({
    //         uploadimage,
    //         success:"image uploaded successfuly",
    //         // success:1,
    //         // profile_url:`http://localhost:8800/image/${req.file.filename}`
    //      })
    //     }catch(error){
    //         return next(new Error(error));
    //     }
    // });
    app.post('/api/upload', upload.single('image'),uploadController.create);
    app.get('/api/allimages', uploadController.getAllimage);
    app.get('/api/oneimage/:id', uploadController.getIdimage);
    app.put('/api/editimage/:id', upload.single('image'), uploadController.editimage);
    app.delete('/api/oneimagedelete/:id', uploadController.deleterecord);


    app.post('/api/productseller',authorized,productsellerController.create);



};