const multer = require('multer');

module.exports = multer({

   fileFilter:(req,file,cb) =>{
   	 if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
       }
	// if(!file.mimetype.match(/jpg|png|jpeg|gif$i/)){
	// 	cb('please upload image only image type',false);
	// 	return
	// }else{	
	// 	cb(null,true);
	// }

},
	storage:multer.diskStorage({
	destination: (req,file,cb) =>{
		cb(null,'./upload/images');
	},
	filename: (req,file,cb) =>{
		// cd(null,Date.now()+file.originalname)
		 cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
})


})

	

// var fileupload = multer({storage:storage});
// module.exports = {
// 	fileupload
// }