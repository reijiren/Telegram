const fs = require('fs');
const userModel = require('../model/user.model');

module.exports = {
    removePhoto: async (req, res, next) => {
		const id = req.params.id;

		const data = await userModel.selectUserId(id);
		if(data) {
			if (data.rows[0].photo) {
				const img = data.rows[0].photo;
				if (img !== "default.png") {
					fs.unlink(`./assets/${img}`, (err) => {
						if (err) {
							// res.json({
							// 	message: "delete failed",
							// 	error: err,
							// });
							console.log(err)
						}
					});
				}
				next();
			} else {
				res.json("There is no profile picture");
			}
		}else{
			res.json("User ID is not found");
		}
    },

    removePorto: async (req, res, next) => {
		const id = req.params.id;
        
		const data = await userModel.selectPortoId(id);
		if(data) {
			if (data.rows[0].image) {
				const img = data.rows[0].image;
				if (img !== "defaultPorto.png") {
					fs.unlink(`./assets/${img}`, (err) => {
						if (err) {
							// res.json({
							// 	message: "delete failed",
							// 	error: err,
							// });
							console.log('delete failed')
						}
					});
				}
				next();
			} else {
				res.json("There is no portofolio");
			}
		}else{
			res.json("Portofolio ID is not found");
		}
    },
}