const Authentication = require("./controllers/authentication");
const passport = require("passport");
const passportService = require("./services/passport");
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignIn = passport.authenticate("local", { session: false });
module.exports = (app) => {
  app.get("/", requireAuth, (req, res) => {
    res.send({ user: "you have been logged in" });
  });
  app.post("/signin", requireSignIn, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/image-caption", requireSignIn, requireAuth);
};
