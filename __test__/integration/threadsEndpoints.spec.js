const request = require("supertest");
require("dotenv").config();
const app = require("../../server");
const { MongoClient } = require("mongodb");

describe("api server", () => {
  let api;
  let connection;
  let db;

  beforeAll(async () => {
    api = app.listen(4000, () => {
      console.log("Test server running on port 4000");
    });
    connection = await MongoClient.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(process.env.DB_NAME);
  });

  afterAll(async () => {
    console.log("Gracefully stopping testing server");
    api.close();
    await connection.close();
  }, 30000);

  beforeEach(async () => {
    // Clear the 'Threads' collection before each test
    await db.collection("Threads").deleteMany({});
  });

  it("should insert a thread into a collection of threads", async () => {
    const threads = db.collection("Threads");

    const mockThreads = {
      _id: "6582d911f41a3af170bbccty",
      Question: "How to find the area",
      Subject: "Maths",
      createdAt: "2023-12-20T12:07:45.559Z",
      updatedAt: "2023-12-20T12:07:45.559Z",
      __v: 0,
    };

    await threads.insertOne(mockThreads);

    const insertedThread = await threads.findOne({
      _id: "6582d911f41a3af170bbccty",
    });
    expect(insertedThread).toEqual(mockThreads);
  });

  it("should respond with status 200 and return threads from MongoDB", async () => {
    const res = await supertest(api).get("/threads");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
