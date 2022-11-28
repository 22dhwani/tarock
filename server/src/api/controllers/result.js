import Result from "../models/result.js";
import User from "../models/user.js";

function getSocionicsResult(answers) {
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

async function getByUser(req, res) {
    if (req.query.userId) {
        try {
            const data = await Result.getByUser(req.query.userId);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }

    } else {
        res.status(400).send({error_msg: "User ID is required!"});
    }
};

async function create(req, res) {
    const result = new Result.Result({
        userId: req.body.userId,
        assessmentGroupId: req.body.assessmentGroupId,
        numOfQuestions: req.body.answers.length,
        duration: req.body.duration,
        code: getSocionicsResult(req.body.answers)
    });

    try {
        const data = await Result.create(result);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
};

export default { getSocionicsResult, getByUser, create};