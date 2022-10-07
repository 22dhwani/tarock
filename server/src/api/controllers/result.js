const Result = require("../models/result.js");

getSocionicsResult = (answers) => {
    const count = {
        J: 0,
        P: 0,
        T: 0,
        F: 0,
        S: 0,
        N: 0,
        E: 0,
        I: 0,
        Terminal: 0,
        Initial: 0
    };
    answers.forEach((answer) => {
        count[answer]++;
    });
    let result = '';
    if (count.J > count.P) {
        if (count.T > count.F) {
            result += 'L';
        } else {
            result += 'E';
        }
        if (count.S > count.N) {
            result += 'S';
        } else {
            result += 'I';
        }
        if (count.E > count.I) {
            result += 'E';
        } else {
            result += 'I';
        }
    } else {
        if (count.S > count.N) {
            result += 'S';
        } else {
            result += 'I';
        }
        if (count.T > count.F) {
            result += 'L';
        } else {
            result += 'E';
        }
        if (count.E > count.I) {
            result += 'E';
        } else {
            result += 'I';
        }
    }
    return result;
}

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
        code: getSocionicsResult(req.body.answers)
    });
    Result.create(result, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
};