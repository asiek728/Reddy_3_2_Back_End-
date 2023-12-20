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

describe("Flash Stacks Crud tests", () => { //needs autherisation to run correctly
    it("should return all flashStacks", async () => {
        const res = await request(app).get("/flashStacks");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return a single flashStack", async () => {
        const res = await request(app).get("/flashStacks/[validId]")
        expect(res.statusCode).toBe(200);
        expect(res.body.topic).toBe("history")

    })
    it("should create a flashStack", async () => {
        const res = await request(app).post("/flashStacks").send({
            "StudentID": "email@test.com", 
            "topic": "geography",
            "cardCount": 0,
            "stackTimer": "1995-10-11T23:00:00.000Z"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.StudentID).toBe("email@test.com");
      });

    it("should delete a flashStack", async () => {
        const res = await request(app).delete(
        "/flashStacks/[validId]"
        );
        expect(res.statusCode).toBe(200);
    });
});

