import mongoose from "mongoose";
import supertest from "supertest";
import config from "../../configs";
import User from "../../models/users";
import app from "../../app";

describe("POST /api/auth/login", ()=>{

    beforeAll(async () => {
        try {
            await mongoose.connect(config.DB_URI_TEST);
        } catch (error) {
            console.error('Database connection error:', error);
        }
    });


    afterAll(async ()=>{
        await User.deleteMany({});
    })

    it("should login a user", async ()=>{
        const res = await supertest(app).post("/api/auth/login").send({
	        email: "ecdhjah07@gmail.com",
	        password: "elijah57"  

        })

        expect (res.statusCode).toEqual(200);
        expect (res.body).toHaveProperty("accessToken");
        // expect (response.body.user)
    });

    
});