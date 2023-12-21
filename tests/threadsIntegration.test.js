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

    it("should return a specific thread", async () => {
      const res = await request(app).get("/threads/658402b0ff5a98ea531fdd34").set('Authorization', auth)
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({
        "_id": "658402b0ff5a98ea531fdd34",
        "Question": "What factors effect the stock prices?",
        "Subject": "Economics",
        "Email": "low14@hotmail.com",
        "createdAt": "2023-12-21T09:17:36.516Z",
        "updatedAt": "2023-12-21T09:17:36.516Z",
        "__v": 0
      })
    })

    it("should create a thread", async () => {
      const res = await request(app).post("/threads").set('Authorization', auth).send({
        "Question": "How to become good at testing",
        "Subject": "CS",
        "Email": "test@test.com"
      })
      expect(res.statusCode).toBe(200)
      expect(res.body.Subject).toBe("CS")
    })

    // it("should delete a thread", async () => {
    //   const res = await request(app).delete("/threads/")
    // })

})
