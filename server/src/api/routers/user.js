module.exports = app => {
    const user = require('../controllers/user');
    const express = require('express');

    const router = express.Router();

    router.get("/status/:id", user.getUserStatus);
    router.post("/", user.create);
    router.get("/:id", user.query);
    router.put("/", user.update);
    router.post("/tmpIdToRealId", user.createTmpIdToRealId);

    app.use("/api/user", router);
}