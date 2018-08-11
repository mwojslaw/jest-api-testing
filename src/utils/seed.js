const seedMovies = db =>
  db.collection("movie").insertMany([
    {
      title: "Harry Potter and the philosopher's stone"
    },
    {
      title: "Harry Potter and the chamber of secrets"
    }
  ]);

const seed = db => {
  seedMovies(db);
};

module.exports = seed;
