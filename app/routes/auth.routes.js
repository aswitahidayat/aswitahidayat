const { verifyUser, verifyLogin, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
	app.post(
		"/signup",
		[
			verifyUser.checkRequired,
			verifyUser.checkDuplicateUsernameOrEmail,
		],
		controller.signup
	);

	app.post(
		"/login", 
		[verifyLogin.checkRequired], 
		controller.login
	);

	app.get("/protectedPage", [authJwt.verifyToken], controller.protectedPage);

	app.post("/refreshtoken", controller.refreshToken);
};
