const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getDate();
  return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
};
exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "please provide email/password to sign-in" });
  }
  User.findOne({ email }, (err, exists) => {
    if (err) {
      return next(err);
    }

    if (exists) {
      return res.status(422).send({ error: "Email is in use" });
    }
    const user = new User({ email, password });
    user.save((err) => {
      if (err) {
        return next(err);
      }
    });
    res.json({ token: tokenForUser(user) });
  });

  // res.send({ success: 'true' });
};

exports.signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};
