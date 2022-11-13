const sql = require("./db.js");

const User = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.gender = user.gender;
    this.avatarIndex = user.avatarIndex;
    this.dob = user.dob;
}

User.create = (user, cb) => {
    sql.query("INSERT INTO tmp_user (name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?);", [user.name, user.gender, user.avatarIndex, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.query = (id, cb) => {
    sql.query("SELECT * FROM tmp_user WHERE internal_user_id = ?;", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.update = (user, cb) => {
    sql.query("UPDATE tmp_user SET name = ?, gender = ?, avatar_index = ?, birth_date = ? WHERE internal_user_id = ?;", [user.name, user.gender, user.avatarIndex, user.dob, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.queryRealId = (id, cb) => {
    sql.query("SELECT * FROM tmp_user_to_real_user WHERE tmp_user_id = ? order by created_at desc limit 1;", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.queryTmpId = (id, cb) => {
    sql.query("SELECT * FROM tmp_user_to_real_user WHERE real_user_id = ? order by created_at desc limit 1;", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.createTmpIdToRealId = (tmpId, realId, cb) => {
    sql.query("INSERT INTO tmp_user_to_real_user (tmp_user_id, real_user_id) VALUES (?, ?);", [tmpId, realId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.createReal = (user, cb) => {
    sql.query("INSERT INTO user (email, name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?, ?);", [user.email, user.name, user.gender, user.avatarIndex, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.queryReal = (id, cb) => {
    sql.query("SELECT * FROM user WHERE internal_user_id = ?;", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

User.updateReal = (user, cb) => {
    sql.query("UPDATE user SET name = ?, gender = ?, avatar_index = ?, birth_date = ? WHERE internal_user_id = ?;", [user.name, user.gender, user.avatarIndex, user.dob, user.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}

module.exports = User;
