import supertest from "supertest";
import config from "../../configs";
import * as mongoose from "mongoose";
import User from "../../models/users";
import app from "../../app";


describe("POST /api/auth/register", ()=>{

    beforeAll(async () => {
        try {
            await mongoose.connect(config.DB_URI_TEST);

        } catch (error) {
            console.error('Database connection error:', error);
        }
    });
    
    
    afterAll(async () => {
        try {
            await User.deleteMany({});
        } catch (error) {
            console.error( error);
        }
    });
    

    it("should register a user", async ()=>{
        const res = await supertest(app).post("/api/auth/register").send({
            firstname: "Bob",
	        lastname: "Marley",
	        gender: "male",
	        email: "ecdhjahh07@gmail.com",
	        password: "elijah57"  

        })

        expect(res.statusCode).toEqual(201);
        // expect(res.body).toHaveProperty('user');
        // expect(res.body).toHaveProperty('mailSent');
        // expect(res.body.mailSent).toHaveProperty('mailSent', 'true');
        // expect(res.body.user).toHaveProperty('firstname', 'Bob');



    }, 15000);

})