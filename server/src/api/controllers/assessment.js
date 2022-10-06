const Assessment = require("../models/assessment.js");

exports.getAll = (req, res) => {
    if (req.query.groupId) {
        Assessment.getAllByGroupId(req.query.groupId, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        res.status(400).json({error_msg: "Group ID is required!"});
    }
};
