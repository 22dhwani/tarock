const sql = require("./db.js");

const Assessment = function(assessment) {
    this.content = assessment.content;
}

Assessment.getAllByGroupId = (groupId, cb) => {
    sql.query("SELECT content FROM question WHERE group_id = ?", [groupId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

module.exports = Assessment;
