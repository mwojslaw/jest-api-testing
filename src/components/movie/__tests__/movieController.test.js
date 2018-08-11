const request = require("supertest");
const createServer = require("./../../../../server");
const { openMockConnection, getMockDB } = require("./../../../utils/mock");
const seed = require("./../../../utils/seed");

let connection;
let db;

beforeAll(async () => {
  connection = await openMockConnection();
  db = await getMockDB(connection);
  await seed(db);
});

afterAll(async () => {
  await connection.close();
});

it("/movies", async () => {
  const response = await request(createServer(() => db)).get("/movies");
  expect(response.status).toBe(200);
});
