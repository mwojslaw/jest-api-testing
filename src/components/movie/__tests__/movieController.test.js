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

it("GET:/movies - should return '401' status ", async () => {
  const { status } = await request(createServer(() => db)).get("/movies");
  expect({
    status
  }).toMatchSnapshot();
});

it("GET:/movies - should return movies array and '200' status", async () => {
  const user = await getUserById(db, 1);
  const { body, status } = await request(createServer(() => db))
    .get("/movies")
    .set({
      authorization: getTokenForUser(user)
    });

  expect({
    status,
    body
  }).toMatchSnapshot();
});

it("POST:/movies - should return newly added movie and '200' status", async () => {
  const user = await getUserById(db, 1);
  const { status, body } = await request(createServer(() => db))
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
    status,
    body
  }).toMatchSnapshot();
});

it("POST:/movies - should return '500' status and proper error message", async () => {
  const user = await getUserById(db, 1);
  const { status, body } = await request(createServer(() => db))
    .post("/movies")
    .set({
      authorization: getTokenForUser(user),
      contentType: "application/json",
      accept: "application/json"
    })
    .send({});

  expect({
    status,
    body
  }).toMatchSnapshot();
});
