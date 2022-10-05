module.exports = app => {
    const credential = require('../controllers/credential');
    const express = require('express');

    const router = express.Router();

    router.get("/check", credential.check);

    app.use("/api/credential", router);
}