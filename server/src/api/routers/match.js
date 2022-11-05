module.exports = app => {
    const match = require('../controllers/match');
    const express = require('express');

    const router = express.Router();

    router.post("/", match.create);

    app.use("/api/match", router);
}