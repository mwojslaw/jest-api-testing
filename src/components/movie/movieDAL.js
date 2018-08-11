const getMovies = db =>
  db
    .collection("movie")
    .find()
    .toArray();

const addMovie = (db, id, title) =>
  db.collection("movie").insert({
    _id: id,
    title
  });

module.exports = {
  getMovies,
  addMovie
};
