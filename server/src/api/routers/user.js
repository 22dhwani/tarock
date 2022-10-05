module.exports = app => {
    const user = require('../controllers/user');
    const express = require('express');

    const router = express.Router();

    router.post("/", user.create);
    router.get("/:id", user.query);
    router.put("/", user.update);

    app.use("/api/user", router);
}