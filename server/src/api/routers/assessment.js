module.exports = app => {
    const assessment = require('../controllers/assessment');
    const express = require('express');

    const router = express.Router();

    router.get("/", assessment.getAll);

    app.use("/api/assessment", router);
}