const Result = require("../models/result.js");

exports.getByUser = (req, res) => {
    if (req.query.userId) {
        Result.getByUser(req.query.userId, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        res.status(400).send({error_msg: "User ID is required!"});
    }
};

exports.create = (req, res) => {
    const result = new Result({
        userId: req.body.userId,
        assessmentGroupId: req.body.assessmentGroupId,
        numOfQuestions: req.body.answers.length,
        duration: req.body.duration,
        code: 'SLI'
    });
    Result.create(result, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
};