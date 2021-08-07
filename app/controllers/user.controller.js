const db = require("../models");
const { user: User, refreshToken: RefreshToken } = db;
const bcrypt = require("bcryptjs");

const redisConfig = require("../config/redisConfig")

function setRedis(key, data){
	redisConfig.client.set(key, JSON.stringify(data));
}

exports.getAllUser = async (req, res) => {
	var users = await User.find();
	res.status(200).send({ data: users });
};

exports.getAllUserByAccountNumber = async (req, res) => {
	if(!req.body.accountNumber){
		res.status(500).send({ message: 'accountNumber cannot be null' });
	}
	var users = await User.find({accountNumber: req.body.accountNumber});
	res.status(200).send({ data: users });
};

exports.getAllUserByIdentityNumber = async (req, res) => {
	if(!req.body.identityNumber){
		res.status(500).send({ message: 'identityNumber cannot be null' });
	}
	var users = await User.find({identityNumber: req.body.identityNumber});
	res.status(200).send({ data: users });
};

exports.getUser = (req, res) => {
	var ObjectId = require('mongodb').ObjectId; 
	var uid = new ObjectId(req.params.id);
	User.findOne({
		_id: uid,
	}).exec(async (err, user) => {
		if (!user) return res.status(404).send({ message: "User Not found." })
		setRedis(req.params.id, JSON.stringify(user));
		res.status(200).send({
			_id: user._id,
			username: user.username,
			accountNumber: user.accountNumber,
			email: user.email,
			identityNumber: user.identityNumber,
			password: user.password
		});
	});
};

exports.createUser = async (req, res) => {
	const user = new User({
		username: req.body.username,
		accountNumber: req.body.accountNumber,
		email: req.body.email,
		identityNumber: req.body.identityNumber,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	user.save((err, user) => {
		res.status(200).send({ message: "User was registered successfully!" });
	});
};

exports.updateUser = async (req, res) => {
	try {
		var ObjectId = require('mongodb').ObjectId; 
		var uid = new ObjectId(req.params.id);
		User.findOne({
			_id: uid,
		}).exec(async (err, user) => {
			if (!user) return res.status(404).send({ message: "User Not found." })
			const userData = {
				username: req.body.username,
				accountNumber: req.body.accountNumber,
				email: req.body.email,
				identityNumber: req.body.identityNumber,
				password: bcrypt.hashSync(req.body.password, 8),
			};
			redisConfig.client.del(req.params.id);
			await User.updateOne({ _id: uid }, userData);
			res.status(200).send({ message: "User was successfully updated!" });
		});

	}catch(err) {
		return res.status(404).send({ message: "User Not found." })
	}
};
exports.deleteUser = async (req, res) => {
	var ObjectId = require('mongodb').ObjectId; 
	var uid = new ObjectId(req.params.id);
	User.findOne({
		_id: uid,
	}).exec(async (err, user) => {
		if (!user) return res.status(404).send({ message: "User Not found." })
		try {
            await User.deleteOne({_id : uid});
		}catch(err) {
			res.status(500).send({ message: err });
        }
		res.status(200).send({ message: "User was deleted successfully!" });
	});
};

