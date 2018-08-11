const request = require("supertest");
const createServer = require("./../../../../server");
const { openMockConnection, getMockDB } = require("./../../../utils/mock");
const seed = require("./../../../utils/seed");
const { getTokenForUser } = require("./../../../utils/authentication");
const { getUserById } = require("./../../user/userDAL");

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

it("GET:/movies - unauthorized", async () => {
  const response = await request(createServer(() => db)).get("/movies");
  expect({
    status: response.status
  }).toMatchSnapshot();
});

it("GET:/movies", async () => {
  const user = await getUserById(db, 1);
  const response = await request(createServer(() => db))
    .get("/movies")
    .set({
      authorization: getTokenForUser(user)
    });

  expect({
    status: response.status,
    text: response.text
  }).toMatchSnapshot();
});

it("POST:/movies", async () => {
  const user = await getUserById(db, 1);
  const response = await request(createServer(() => db))
    .post("/movies")
    .set({
      authorization: getTokenForUser(user),
      contentType: "application/json",
      accept: "application/json"
    })
    .send({
      id: 3,
      title: "Lord of the rings"
    });

  expect({
    status: response.status,
    text: response.text
  }).toMatchSnapshot();
});

it("POST:/movies - incorrect params", async () => {
  const user = await getUserById(db, 1);
  const response = await request(createServer(() => db))
    .post("/movies")
    .set({
      authorization: getTokenForUser(user),
      contentType: "application/json",
      accept: "application/json"
    })
    .send({});

  expect({
    status: response.status,
    text: response.text
  }).toMatchSnapshot();
});
