const { getMovies: getAllMovies, addMovie: saveMovie } = require("./movieDAL");

const getMovies = db => async (req, res) => {
  const movies = await getAllMovies(db());
  res.status(200).json({
    movies
  });
};

const addMovie = db => async (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) throw new Error("Id and Title required");

  await saveMovie(db(), id, title);

  res.status(200).json({
    movie: { id, title }
  });
};

module.exports = {
  getMovies,
  addMovie
};
