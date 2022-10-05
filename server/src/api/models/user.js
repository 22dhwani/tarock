const sql = require("./db.js");

const User = function(user) {
    this.id = user.id;
    this.name = user.name;
    this.gender = user.gender;
    this.avatarIndex = user.avatarIndex;
    this.dob = user.dob;
}

User.create = (user, cb) => {
    sql.query("INSERT INTO tmp_user (name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?)", [user.name, user.gender, user.avatarIndex, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.query = (id, cb) => {
    sql.query("SELECT * FROM tmp_user WHERE internal_user_id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.update = (user, cb) => {
    sql.query("UPDATE tmp_user SET name = ?, gender = ?, avatar_index = ?, birth_date = ? WHERE internal_user_id = ?", [user.name, user.gender, user.avatarIndex, user.dob, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

module.exports = User;
