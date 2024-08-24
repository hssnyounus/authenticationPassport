const models = require('../models');
// const express = require('express');
const { Image } = models;
// const app = express();
// app.use('/profile',express.static('upload/images'));

module.exports = {
	async create(req, res, next) {
		try {
			var profile_url = '/image/';
			const image = profile_url + req.file.filename;

			const uploadimage = await Image.create({ image });
			console.log(req.file)
			console.log(image);
			return res.status(201).json({
				uploadimage,
				success: "image uploaded successfuly",
				// success:1,

			})
		} catch (error) {
			return next(new Error(error)); console.log(req.file)
		}

	},

	async getAllimage(req, res, next) {
		try {

			const Allimages = await Image.findAll()


			return res.status(200).json({
				Allimages,
				success: "all images show successfuly",
				profile_url: `http://localhost:8800/image/`

			})
		} catch (error) {
			return next(new Error(error));
		}

	},

	async getIdimage({ params }, res, next) {
		try {
			// const {image} = req.body;
			// const Allimages = await Image.findAll({image:res.file.filename})
			// const baseUrl =  profile_url+`http://localhost:8800/image/${res}`
			const Idimages = await Image.findOne({ where: { id: params.id } })
			// console.log(Allimages);
			return res.status(200).json({
				Idimages,
				success: "all images show successfuly",
				profile_url: `http://localhost:8800/image/`

			})
		} catch (error) {
			return next(new Error(error));
		}

	},
	// }
	async editimage(req, res, next) {

		try {



			var profile_url = 'http://localhost:8800/image/';
			// const image = req.file.filename;	
			const image = profile_url + req.file.filename;
			const id = req.params.id
			const uploadimage = await Image.update(
				{

					image
				},
				{
					where: {
						id
						// id: req.params.id
						// id
					},
					returning: true,
					plain: true
				}
			);
			// const updatedimage = await Image.findOne({id:req.params.id});
			// const updatedimage = await Image.findByPk(req.params.id);
			// console.log(findid);
			return res.status(201).json({
				// updatedimage,
				uploadimage,
				success: "image updated successfuly",
				// profile_url:`http://localhost:8800/image/${req.file.filename}`
			})
		} catch (error) {
			console.log(error)
			// return error;
			return next(new Error(error));
		}
	},

	async deleterecord({ params }, res, next) {
		try {
			const image = Image.destroy({
				where: {
					id: params.id

				}
			});
			return res.status(20).send({ image, message: { success: "deleterecord successfully" } })
		} catch (error) {
			return next(new Error(error))
		}

	}
}
