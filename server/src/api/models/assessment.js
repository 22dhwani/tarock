const sql = require("./db.js");

const Assessment = function(assessment) {
    this.content = assessment.content;
}

Assessment.getAll = result => {
    sql.query("SELECT * FROM question", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("questions: ", res);
        result(null, res);
    });
}

module.exports = Assessment;
