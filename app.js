const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const models = require('./api/models');
// const {Image} = models;
// console.log(Image);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const storage = multer.diskStorage({
// 	destination: './upload/images',
// 	filename: (req,file,cd) =>{
// 		 cd(null, file.fieldname + Date.now() + path.extname(file.originalname))
// 	}
// });
// const upload = multer({
//	storage:storage
//});
const app = express();
// const router = app.route();
const port = 8800;
const {routes} = require('./api/routes');
// const authRouter = require('./api/routes/index');
app.use(morgan('dev'));
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,
    cookie:{secure:false}
}));
app.use(passport.initialize());
app.use(passport.session());
routes(app);

app.use('/image',express.static('upload/images'))
// app.post('/api/upload', upload.single('image'), async(req,res)=>{
// 	const image = req.file;
// 	// const image = req.body;
// 	console.log(image);
// 		const uploadimage = await Image.create(
// 			// image:req.file.filename
// 			image
// 		);
// 	res.json({
// 		uploadimage,
// 		success:1,
// 		profile_url:`http://localhost:8800/image/${req.file.filename}`
// 	})
// })







// app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended:false}));
// app.post('/api/login',passport.authenticate('local',{session:false}))
// console.log(routes);
// app.use('/api/login',authRouter);

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!${port}`))                                                          
