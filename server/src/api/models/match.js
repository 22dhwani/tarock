import sql from "./db.js";

const Match = function(match) {
    this.origUserId = match.origUserId;
    this.matchedUserId = match.matchedUserId;
}

Match.query = (id, cb) => {
    sql.query("SELECT * FROM user_match WHERE orig_user_id = ? OR matched_user_id = ?;", [id, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
};

Match.create = (match, cb) => {
    sql.query("SELECT * FROM user_match WHERE orig_user_id = ? AND matched_user_id = ? OR orig_user_id = ? AND matched_user_id = ? LIMIT 1;", [match.origUserId, match.matchedUserId, match.matchedUserId, match.origUserId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
        } else if (res.length > 0) {
            cb({ err: "Duplicated pair." }, null);
        } else {
            sql.query("INSERT INTO user_match (orig_user_id, matched_user_id) VALUES (?, ?);", [match.origUserId, match.matchedUserId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    cb(err, null);
                    return;
                }
                cb(null, res);
            });
        }
    });
}

export default Match;
