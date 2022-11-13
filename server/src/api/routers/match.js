import match from '../controllers/match';
import express from 'express';

export default function(app) {
    const router = express.Router();
    router.post("/", match.create);
    app.use("/api/match", router);
}