import test from '../../controllers/v1/test.js';
import question from '../../controllers/v1/question.js';
import express from 'express';

export default function(app) {
    const router = express.Router();


    //QUESTIONS
    router.get("/questions", question.getQuestion);

    router.post("/test", test.test);

    app.use("/api/v1", router);
}
