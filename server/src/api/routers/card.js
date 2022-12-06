import express from 'express';
import card from '../controllers/card.js';
import { checkAuthenticated } from '../../auth/credential.js';

export default function(app) {
    const router = express.Router();
    router.get("/user/:id", checkAuthenticated, card.getByUser);
    router.get("/:type", card.getByType);
    app.use("/api/card", router);
}
