module.exports = app => {
    const card = require('../controllers/card');
    const express = require('express');

    const router = express.Router();

    router.get("/:type", card.getByType);

    app.use("/api/card", router);
}