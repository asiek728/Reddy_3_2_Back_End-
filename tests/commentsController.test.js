const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("endpoints for comments routes should return", () => {
  it("should return all comments", async () => {
    const res = await request(app).get("/comments").set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNTM3NjgsImV4cCI6MTcwMzQxMjk2OH0.ZdZMtzjmIjJRKzuqeAyjBF0zkYBlWH3Y4_e9CWoUolI');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });



});

