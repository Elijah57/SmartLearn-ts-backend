import supertest from "supertest";
import User from "../../models/users";
import app from "../../app";
import { redisCacheClient, redisStoreClient} from "../../configs/redis";
import { connectDB, disconnectDB } from "../utils/db";

describe("POST test register and login routes", ()=>{

    beforeAll(async () => {
        await connectDB();
    });


    afterAll(async ()=>{
        await User.deleteMany({});
        await redisCacheClient.quit()
        await redisStoreClient.quit()
        await disconnectDB();
    })

    
    it("should register a user", async ()=>{
        const res = await supertest(app).post("/api/auth/register").send({
            firstname: "Bob",
	        lastname: "Marley",
	        gender: "male",
	        email: "ecdhjahh07@gmail.com",
	        password: "bobo"  

        })

        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('userId');
        expect(res.body).toHaveProperty('message');
        
    }, 15000);

    it("should login a user", async ()=>{
        const res = await supertest(app).post("/api/auth/login").send({
	        email: "ecdhjahh07@gmail.com",
	        password: "bobo"  

        })

        expect (res.status).toEqual(200);
        expect (res.body).toHaveProperty("data");
        // expect (response.body.user)
    });

    
});