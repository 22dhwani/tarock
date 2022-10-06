module.exports = app => {
    const result = require('../controllers/result.js');
    const express = require('express');

    const router = express.Router();

    router.get("/", result.getByUser);
    router.post("/", result.create);

    app.use("/api/result", router);
}