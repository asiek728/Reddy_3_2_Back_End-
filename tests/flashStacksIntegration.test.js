const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNTU2ODgsImV4cCI6MTcwMzQxNDg4OH0.01YeTxm3IMojUk7EGaeyHVvcZ7ymSJlw3nzMNdf5AtA'

let server

beforeEach(async () => {
    server = app.listen(process.env.PORT + 1)
  await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
  await server.close()
});


describe("endpoints for flashStacks routes", () => {

    it("should return all flashStacks with 200 status code", async () => {
      const res = await request(app).get("/flashStacks").set('Authorization', auth);
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });

    it("should return a specific flashStack with 200 status code", async () => {
        const res = await request(app).get("/flashStacks/65844d73986288ce37819638").set('Authorization', auth)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            "_id": "65844d73986288ce37819638",
            "StudentID": "testing88@gmail.com",
            "topic": "CS",
            "cardCount": 0,
            "stackTimer": "2023-12-21T11:43:52.980Z",
            "userID": "6584106828ae8f207f141798",
            "createdAt": "2023-12-21T14:36:35.945Z",
            "updatedAt": "2023-12-21T14:36:35.945Z",
            "__v": 0
        });
    })

    it("should create a new flashStack with 200 status code", async() => {
        const res = await request(app).post("/flashStacks").set('Authorization', auth).send({
            "userID": "6584106828ae8f207f141798",
            "StudentID": "testing88@gmail.com",
            "topic": "CS",
            "cardCount": "0",
            "stackTimer": "2023-12-21T11:43:52.980Z"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.topic).toBe("CS")
    })

    // it("should delete a flashStack with a 200 status code", async () => {
    //     const res = await request(app).delete("/flashStacks/658424f97aa648243356c04a").set('Authorization', auth)
    //     expect(res.statusCode).toBe(200)
    //     expect(res.body).toEqual({}); 
    // })

})
