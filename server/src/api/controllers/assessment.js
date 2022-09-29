const Assessment = require("../models/assessment.js");

exports.findAll = (req, res) => {
    Assessment.getAll((err, data) => {
        res.send(data);
    });
};
