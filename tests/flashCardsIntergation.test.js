const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNzExMDAsImV4cCI6MTcwMzQzMDMwMH0.MPKvTYX7W3Y9AohxjX7kDf8lTXa2ipEYYTdffXVgN38'

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("endpoints for flashcards routes", () => {
  it("should return all the flashcards", async () => {
    const res = await request(app).get("/flashCards").set('Authorization', auth);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should create a flashcard with correct data", async () => {
    const res = await request(app).post("/flashCards").send({
      stackID: "abcde",
      frontSide: "front",
      backSide: "back",
    }).set('Authorization', auth);
    expect(res.statusCode).toBe(201);
    expect(res.body.stackID).toBe("abcde");
    expect(res.body.frontSide).toBe("front");
    expect(res.body.backSide).toBe("back");
  });

  it("should get a specific flashcard", async () => {
    const res = await request(app).get(
      "/flashCards/658424ac81714e7f116e810e"
    ).set('Authorization', auth);
    expect(res.statusCode).toBe(200);
    expect(res.body.front).toBe("front");
  });

  it("should update a flashcard", async () => {
    const res = await request(app)
      .patch("/flashCards/658425fd60728cd74aa9e8b9")
      .send({
        frontSide: "frontEdited",
        backSide: "backEdited"
      }).set('Authorization', auth);
    expect(res.statusCode).toBe(200);
    expect(res.body.frontSide).toBe("frontEdited");
    expect(res.body.backSide).toBe("backEdited");
  });

  it("should delete a flashcard", async () => {
    const res = await request(app).delete(
      ("/flashCards/6584260360728cd74aa9e8be")
    ).set('Authorization', auth);
    expect(res.statusCode).toBe(200);
  });

});




