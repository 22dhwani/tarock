import result from '../controllers/result.js';
import express from 'express';

export default function(app) {
    const router = express.Router();
    router.get("/", result.getByUser);
    router.post("/", result.create);
    app.use("/api/result", router);
}