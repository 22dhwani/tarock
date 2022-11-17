import credential from '../controllers/credential.js';
import express from 'express';

export default function(app) {
    const router = express.Router();
    router.get("/check", credential.check);
    app.use("/api/credential", router);
}