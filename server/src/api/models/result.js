const sql = require("./db.js");

const defaultAssessmentGroupId = 1;
const Result = function(result) {
    this.userId = result.userId;
    this.assessmentGroupId = result.assessmentGroupId;
    this.numOfQuestions = result.numOfQuestions;
    this.duration = result.duration;
    this.code = result.code;
}

Result.getByUser = (userId, cb) => {
    sql.query("SELECT * FROM user_assessment_result WHERE internal_user_id = ? AND question_group_id = ? order by created_at desc limit 1;", [userId, defaultAssessmentGroupId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

Result.create = (result, cb) => {
    sql.query("INSERT INTO user_assessment_result (internal_user_id, question_group_id, num_of_questions, duration, result_code) VALUES (?, ?, ?, ?, ?);", [result.userId, result.assessmentGroupId, result.numOfQuestions, result.duration, result.code], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

module.exports = Result;
