const createServer = require("./server");
const MongoClient = require("mongodb").MongoClient;
const seed = require("./src/utils/seed");

let db;
const getDb = () => db;

MongoClient.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db(process.env.MONGODB_DB_NAME);
    seed(db);
  }
);

const server = createServer(getDb);

const port = process.env.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`));
