import test from '../../controllers/v1/test.js';
import express from 'express';

export default function(app) {
    const router = express.Router();


    router.post("/test", test.test);

    app.use("/api/v1", router);
}
