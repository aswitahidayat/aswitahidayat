const express = require("express")
const cors = require("cors")
const dbConfig = require("./app/config/db.config")
const redisConfig = require("./app/config/redisConfig")

require('dotenv').config();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Check database connection
const db = require("./app/models");

db.mongoose
	// .connect(`mongodb://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
	.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DB}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connect to MongoDB.");
	})
	.catch(err => {
		console.error("MongoDB Connection error", err);
		process.exit();
	});


redisConfig.client.on('ready', function () {
	console.log('Successfully connect to Redis.');
}).on('error', function (err) {
	console.log('Redis not connected!' , err);
});

app.get("/", (req, res) => {
	res.json({ message: "API WORKS" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
