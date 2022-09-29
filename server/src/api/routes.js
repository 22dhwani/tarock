module.exports = app => {
    const assessment = require("./controllers/assessment.js");

    const router = require("express").Router();

    router.get("/", assessment.findAll);

    app.use("/api/assessments", router);
}