const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNzExMDAsImV4cCI6MTcwMzQzMDMwMH0.MPKvTYX7W3Y9AohxjX7kDf8lTXa2ipEYYTdffXVgN38'

let server

beforeEach(async () => {
    server = app.listen(process.env.PORT + 4)
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
  await server.close()
});

describe("endpoints for flashStacks routes", () => {

    it("should create a new user", async () => {

        const email = Math.round(Math.random()*100000)+"@email.com"

      const res = await request(app).post("/users/signup").send({
        "email": email,
        "password":  "PassWord123!!"
      })
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe(email);
    });

    it("should log the existing user in", async () => {
        const res = await request(app).post("/users/login").send({
            "email": "testing88@gmail.com",
            "password": "PassWord123!!"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.email).toBe("testing88@gmail.com")
    })

    

})
