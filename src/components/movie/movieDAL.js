const getMovies = db =>
  db
    .collection("movie")
    .find()
    .toArray();

module.exports = {
  getMovies
};
