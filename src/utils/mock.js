const { MongoClient } = require("mongodb");

const openMockConnection = async () => {
  const connection = await MongoClient.connect(global.__MONGO_URI__);
  return connection;
};

const getMockDB = async connection => {
  const db = await connection.db(global.__MONGO_DB_NAME__);
  return db;
};

module.exports = {
  openMockConnection,
  getMockDB
};
