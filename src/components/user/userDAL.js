const getUserById = (db, id) => db.collection("user").findOne({ _id: id });

module.exports = {
  getUserById
};
