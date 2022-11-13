import { Router } from 'express';
import { card } from '../controllers/card';



export default function(app) {
    const router = express.Router();
    router.get("/user/:id", card.getByUser);
    router.get("/:type", card.getByType);
    app.use("/api/card", router);
}
