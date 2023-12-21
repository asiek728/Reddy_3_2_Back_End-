const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNTU2ODgsImV4cCI6MTcwMzQxNDg4OH0.01YeTxm3IMojUk7EGaeyHVvcZ7ymSJlw3nzMNdf5AtA'


let server

beforeEach(async () => {
  server = app.listen(process.env.PORT)
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
  await server.close()
});


describe("endpoints for comments routes", () => {
  it("should return all comments", async () => {
    const res = await request(app).get("/comments").set('Authorization', auth);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return specific comment with 200 status code", async () => {
    const res = await request(app).get("/comments/658402b0ff5a98ea531fdd34").set('Authorization', auth)
    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0);

  })

  it("should create a new comment with 200 status code", async () => {
    const res = await request(app).post("/comments").set('Authorization', auth).send({
        "Email": "testing88@gmail.com",
        "comment": "Test please pass",
        "ThreadID": "658402b0ff5a98ea531fdd34"
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.comment).toBe("Test please pass")

  })

  it("should delete a comment with 200 status code", async () => {
    const res = await request(app).delete("/comments/658402b0ff5a98ea531fdd34").set('Authorization', auth)
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({}); 

  })


});

