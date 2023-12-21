const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

const auth = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0MTA2ODI4YWU4ZjIwN2YxNDE3OTgiLCJpYXQiOjE3MDMxNzExMDAsImV4cCI6MTcwMzQzMDMwMH0.MPKvTYX7W3Y9AohxjX7kDf8lTXa2ipEYYTdffXVgN38'

beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("User Crud tests", () => { 
    it("should create a user", async () => {
        const email = Math.round(Math.random()*100000)+"@email.com"
        const res = await request(app).post("/users/signup").send({
            "email": email,
            "password": "PassWord123!!",
        });
        expect(res.body.StudentID).toBe(email);
    });

    it("shouldn't create a user with the same email twice", async () => {
        const res = await request(app).post("/users/signup").send({
            "email": "email@test.com",
            "password": "PassWord123!!",
        });
        expect(res.statusCode).toBe(400);
    });

    it("should login a user", async () => {
        const res = await request(app).post("/users/login").send({
            "email": "email@test.com",
            "password": "PassWord123!!",
        });
        expect(res.body.StudentID).toBe("email@test.com");
    });

    it("should delete a user", async () => {
        const res = await request(app).delete(
            "/users/[validId]"
        );
        expect(res.statusCode).toBe(200).set('Authorization', auth);
    });
});
