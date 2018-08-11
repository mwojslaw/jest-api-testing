const seedMovies = db =>
  db.collection("movie").insertMany([
    {
      _id: 1,
      title: "Harry Potter and the philosopher's stone"
    },
    {
      _id: 2,
      title: "Harry Potter and the chamber of secrets"
    }
  ]);

const seed = db => {
  seedMovies(db);
};

module.exports = seed;
