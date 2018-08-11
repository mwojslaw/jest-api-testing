const jwt = require("jwt-simple");
const passport = require("passport");

const getTokenForUser = user =>
  jwt.encode({ id: user._id }, process.env.JWT_SECRET);

const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = {
  getTokenForUser,
  requireAuth
};
