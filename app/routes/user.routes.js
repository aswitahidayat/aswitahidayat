const { verifyUser, cache } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/getAllUser", controller.getAllUser);
	app.get("/getAllUserByAccountNumber", controller.getAllUserByAccountNumber);
	app.get("/getAllUserByIdentityNumber", controller.getAllUserByIdentityNumber);
	app.get("/user/:id", [
		cache.getCache
	], controller.getUser);
	app.post("/user",
	[
		verifyUser.checkRequired,
		verifyUser.checkDuplicateUsernameOrEmail,
	], controller.createUser);
	app.put("/user/:id", [
		verifyUser.checkRequired
	],controller.updateUser);
	app.delete("/user/:id", controller.deleteUser);

};
