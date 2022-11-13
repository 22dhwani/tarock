import express from 'express';
import assessment from '../controllers/assessment'

export default function(app) {
    const router = express.Router();
    router.get("/", assessment.getAll);
    app.use("/api/assessment", router);
}
