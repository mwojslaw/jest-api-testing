const { getMovies: getAllMovies } = require("./movieDAL");

const getMovies = db => async (req, res) => {
  const movies = await getAllMovies(db());
  res.status(200).json({
    movies
  });
};

module.exports = {
  getMovies
};
