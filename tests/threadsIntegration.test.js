const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNzExMDAsImV4cCI6MTcwMzQzMDMwMH0.MPKvTYX7W3Y9AohxjX7kDf8lTXa2ipEYYTdffXVgN38'


let server

beforeEach(async () => {
  server = app.listen(process.env.PORT + 3)
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
  await server.close()
});

describe("endpoints for thread routes", () => {

    it("should return all threads", async () => {
      const res = await request(app).get("/threads").set('Authorization', auth);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });


})
