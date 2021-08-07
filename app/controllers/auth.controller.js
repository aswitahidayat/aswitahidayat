const config = require("../config/auth.config");
const db = require("../models");
const { user: User, refreshToken: RefreshToken } = db;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {

	const user = new User({
		username: req.body.username,
		accountNumber: req.body.accountNumber,
		email: req.body.email,
		identityNumber: req.body.identityNumber,
		password: bcrypt.hashSync(req.body.password, 8),
	});

	user.save((err, user) => {
		res.send({ message: "User was registered successfully!" });
	});
};

exports.login = (req, res) => {
	User.findOne({
		username: req.body.username,
	}).exec(async (err, user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			let passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Username or Password Invalid!",
				});
			}

			let token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: config.jwtExpiration,
			});

			let refreshToken = await RefreshToken.createToken(user);

			res.status(200).send({
				id: user._id,
				username: user.username,
				email: user.email,
				accessToken: token,
				refreshToken: refreshToken,
			});
		});
};

exports.refreshToken = async (req, res) => {
	const { refreshToken: requestToken } = req.body;

	if (requestToken == null) {
		return res.status(403).json({ message: "Refresh Token is required!" });
	}

	try {
		let refreshToken = await RefreshToken.findOne({ token: requestToken });

		if (!refreshToken) {
			res.status(403).json({ message: "Refresh token is not in database!" });
			return;
		}

		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

			res.status(403).json({
				message: "Refresh token was expired. Please make a new signin request",
			});
			return;
		}

		let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
			expiresIn: config.jwtExpiration,
		});

		return res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: refreshToken.token,
		});
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};

exports.protectedPage = async (req, res) => {
	return res.status(200).json({ message: "This is protected page" });
}