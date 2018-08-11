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

const seedUsers = db =>
  db.collection("user").insertMany([
    {
      _id: 1,
      email: "test@email.com",
      password: "password"
    }
  ]);

const seed = db => {
  seedMovies(db);
  seedUsers(db);
};

module.exports = seed;
