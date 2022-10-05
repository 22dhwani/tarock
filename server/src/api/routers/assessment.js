module.exports = app => {
    const assessment = require('../controllers/assessment');
    const express = require('express');

    const router = express.Router();

    router.get("/", assessment.findAll);

    app.use("/api/assessments", router);
}