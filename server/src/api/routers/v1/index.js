import test from '../../controllers/v1/test.js';
import User from '../../controllers/v1/user.js';
import question from '../../controllers/v1/question.js';
import express from 'express';
import ApiToken from '../../models/apiToken.js';

export default function(app) {
    const router = express.Router();

    //MIDDLEWARE for AUTH
    router.all("/auth/*", async (req, res, next) => {
        if(!req.headers || !req.headers.authorization){
            res.status(422).json(
                {
                    message:"Unauthorized",
                    status: 0,
                }
            );
        }
        let user = null
        try {
            user = await ApiToken.getUserByBearerToken(req.headers.authorization);
        } catch (error) {
            res.status(422).json(
                {
                    error: error.message,
                    message:"Unauthorized",
                    status: 0,
                }
            );
        }
        res.user = user
        next()
    });


    //TEST(to quickly test some code)
    router.post("/test", test.test);
    router.post("/auth/test", test.test); //test with auth
    router.get("/get-token", test.getToken); //test api to get the 

    //QUESTIONS
    router.get("/questions", question.getQuestion);
    
    //API INSIDE AUTH
    router.get("/auth/user", User.getUser);

    app.use("/api/v1", router);
}
