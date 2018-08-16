const path = require("path");
const fs = require("fs");
const MongodbMemoryServer = require("mongodb-memory-server");
const globalConfigPath = path.join(__dirname, "globalConfig.json");
const mongoServer = new MongodbMemoryServer.MongoMemoryServer();

require("dotenv").config();

module.exports = async function() {
  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: await mongoServer.getConnectionString()
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongoServer;
};
