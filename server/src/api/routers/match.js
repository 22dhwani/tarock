import match from '../controllers/match.js';
import express from 'express';
import { checkAuthenticated } from '../../auth/credential.js';

export default function(app) {
    const router = express.Router();
    router.post("/", checkAuthenticated, match.create);
    app.use("/api/match", router);
}