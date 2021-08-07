const db = require("../models");

checkRequired = (req, res, next) => {
    if (!req.body.username) {
        res.status(500).send({ message: req.body.username });
    }

    if (!req.body.password) {
        res.status(500).send({ message: 'password cannot be null' });
    }

    next();
}

const verifyLogin = {
    checkRequired
};

module.exports = verifyLogin;
