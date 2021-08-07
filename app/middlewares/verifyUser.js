const db = require("../models");
const User = db.user;

checkRequired = (req, res, next) => {
  if(!req.body.username){
    res.status(500).send({ message: 'username cannot be null' });
  }

  if(!req.body.accountNumber){
    res.status(500).send({ message: 'accountNumber cannot be null' });
  }

  if(!req.body.email){
    res.status(500).send({ message: 'email cannot be null' });
  }

  if(!req.body.password){
    res.status(500).send({ message: 'password cannot be null' });
  }

  if(!req.body.identityNumber){
    res.status(500).send({ message: 'identityNumber cannot be null' });
  }

  next();
}
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

const verifyUser = {
  checkRequired,
  checkDuplicateUsernameOrEmail
};

module.exports = verifyUser;
