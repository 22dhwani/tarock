import sql from "../../config/db.js";

const User = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.gender = user.gender;
    this.avatarIndex = user.avatarIndex;
    this.dob = user.dob;
}

async function create(user) {
    const data = await sql.query("INSERT INTO tmp_user (name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?);", [user.name, user.gender, user.avatarIndex, user.id]);
    return data[0];
}

async function query(id) {
    const data = await sql.query("SELECT * FROM tmp_user WHERE internal_user_id = ?;", [id]);
    return data[0];
}

async function update(user) {
    const data = await sql.query("UPDATE tmp_user SET name = ?, gender = ?, avatar_index = ?, birth_date = ? WHERE internal_user_id = ?;", [user.name, user.gender, user.avatarIndex, user.dob, user.id]);
    return data[0];
}

async function queryRealId(id) {
    const data = await sql.query("SELECT * FROM tmp_user_to_real_user WHERE tmp_user_id = ? order by created_at desc limit 1;", [id]);
    return data[0];
}

async function queryTmpId(id) {
    const data = await sql.query("SELECT * FROM tmp_user_to_real_user WHERE real_user_id = ? order by created_at desc limit 1;", [id]);
    return data[0];
}

async function createTmpIdToRealId(tmpId, realId) {
    const data = await sql.query("INSERT INTO tmp_user_to_real_user (tmp_user_id, real_user_id) VALUES (?, ?);", [tmpId, realId]);
    return data[0];
}

async function createReal (user) {
    const data = await sql.query("INSERT INTO user (email, name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?, ?);", [user.email, user.name, user.gender, user.avatarIndex, user.id]);
    return data[0];
}

async function queryReal(id) {
    const data = await sql.query("SELECT * FROM user WHERE internal_user_id = ?;", [id]);
    return data[0];
}

async function updateReal(user) {
    const data = await sql.query("UPDATE user SET name = ?, gender = ?, avatar_index = ?, birth_date = ? WHERE internal_user_id = ?;", [user.name, user.gender, user.avatarIndex, user.dob, user.id]);
    return data[0];
}

async function updateIsPermanentUser(id, is_permanent_user) {
    const data = await sql.query("UPDATE tmp_user SET is_permanent_user = ? WHERE internal_user_id = ?;", [is_permanent_user, id]);
    return data[0];
}

export default { User, create, query, update, queryRealId, queryTmpId, createTmpIdToRealId, createReal, queryReal, updateReal, updateIsPermanentUser };
