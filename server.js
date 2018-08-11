const express = require("express");
const { movieController } = require("./src/components/movie");
const asyncMiddleware = require("./src/utils/asyncMiddleware");

const createServer = getDb => {
  const server = express();

  server.get("/movies", asyncMiddleware(movieController.getMovies(getDb)));

  server.use((error, req, res, next) => {
    res.status(500).json({
      errorMessage: error.message
    });
  });

  return server;
};

module.exports = createServer;
