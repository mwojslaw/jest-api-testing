const express = require("express");
const { movieController } = require("./src/components/movie");
const { getUserById } = require("./src/components/user/userDAL");
const asyncMiddleware = require("./src/utils/asyncMiddleware");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { requireAuth } = require("./src/utils/authentication");
const bodyParser = require("body-parser");

const createServer = getDb => {
  const server = express();

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      const user = await getUserById(getDb(), payload.id);

      if (!user) return done(null, false);

      return done(null, user);
    })
  );

  server.use(bodyParser.json());

  server.get(
    "/movies",
    requireAuth,
    asyncMiddleware(movieController.getMovies(getDb))
  );

  server.post(
    "/movies",
    requireAuth,
    asyncMiddleware(movieController.addMovie(getDb))
  );

  server.use((error, req, res, next) => {
    res.status(500).json({
      errorMessage: error.message
    });
  });

  return server;
};

module.exports = createServer;
