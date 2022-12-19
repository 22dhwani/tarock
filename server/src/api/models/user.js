import sql from "../../config/db.js";
import crypto from 'crypto';

const User = function(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.name = user.name;
    this.gender = user.gender;
    this.avatarIndex = user.avatarIndex;
    this.dob = user.dob;
    this.is_notification_on = user.is_notification_on;
    this.is_match_card_notification_on = user.is_match_card_notification_on;
    this.is_daily_quest_notification_on = user.is_daily_quest_notification_on;
    this.is_new_blog_notification_on = user.is_new_blog_notification_on;
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

async function getAllUser(){
    const data = await sql.query("SELECT * FROM user WHERE is_forbidden = 0;");
    return data[0];
}

/**
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
*/

async function createReal (user) {
    const data = await sql.query("INSERT INTO user (email, password, name, gender, avatar_index, internal_user_id) VALUES (?, ?, ?, ?, ?, ?);", [user.email, user.password, user.name, user.gender, user.avatarIndex, user.id]);
    return data[0];
}

async function queryReal(id) {
    const data = await sql.query("SELECT * FROM user WHERE internal_user_id = ?;", [id]);
    return data[0];
}

async function findUserByEmail(email) {
    const data = await sql.query("SELECT * FROM user WHERE email = ?;", [email]);
    return data[0];
}

async function deleteRealUser(id) {
    const data = await sql.query("DELETE FROM user WHERE internal_user_id = ?;", [id]);
    return data[0];
}

async function disableRealUser(id) {
    let user = await queryReal(id)
    user =user [0]
    let newEmail = user.email+'-deleted'
    let hashEmail = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(newEmail).digest("hex");

    const data = await sql.query("UPDATE user SET internal_user_id = ?, email = ? WHERE id = ?;", [hashEmail,newEmail,user.id])
    return data[0];
}

async function deleteTmpUser(id) {
    const data = await sql.query("DELETE FROM tmp_user WHERE internal_user_id = ?;", [id]);
    return data[0];
}


async function updateReal(user) {
    if (!user.id) {
        throw new Error(`No user id provided. id:${user.id}`);
    }
    const queryResults = await sql.query("SELECT * FROM user WHERE internal_user_id = ?;", [user.id]);
    const oldUsers = queryResults[0];
    if (oldUsers.length === 0) {
        throw new Error(`The user id does not exist. id:${user.id}`);
    }
    const password = user.password ? user.password : oldUsers[0].password;
    const name = user.name ? user.name : oldUsers[0].name;
    const gender = user.gender ? user.gender : oldUsers[0].gender;
    const avatarIndex = user.avatarIndex != undefined ? user.avatarIndex : oldUsers[0].avatar_index;
    const dob = user.dob ? user.dob : oldUsers[0].birth_date;

    let is_notification_on = oldUsers[0].is_notification_on;
    if(user.is_notification_on){
        is_notification_on = user.is_notification_on;
    }else{
        is_notification_on = 0;
    }
    let is_match_card_notification_on = oldUsers[0].is_match_card_notification_on;
    if(user.is_match_card_notification_on){
        is_match_card_notification_on = user.is_match_card_notification_on;
    }else{
        is_match_card_notification_on = 0;
    }

    let is_daily_quest_notification_on = oldUsers[0].is_daily_quest_notification_on;
    if(user.is_daily_quest_notification_on){
        is_daily_quest_notification_on = user.is_daily_quest_notification_on;
    }else{
        is_daily_quest_notification_on = 0;
    }

    let is_new_blog_notification_on = oldUsers[0].is_new_blog_notification_on;
    if(user.is_new_blog_notification_on){
        is_new_blog_notification_on = user.is_new_blog_notification_on;
    }else{
        is_new_blog_notification_on = 0;
    }

    const data = await sql.query("UPDATE user SET password = ?, name = ?, gender = ?, avatar_index = ?, birth_date = ? , is_notification_on = ?,is_match_card_notification_on = ?,is_daily_quest_notification_on = ?, is_new_blog_notification_on = ? WHERE internal_user_id = ?;", [
        password,
        name,
        gender,
        avatarIndex,
        dob,
        is_notification_on,
        is_match_card_notification_on,
        is_daily_quest_notification_on,
        is_new_blog_notification_on,
        user.id
    ]);
    return data[0];
}

async function updateIsPermanentUser(id, is_permanent_user) {
    const data = await sql.query("UPDATE tmp_user SET is_permanent_user = ? WHERE internal_user_id = ?;", [is_permanent_user, id]);
    return data[0];
}

export default { User, create, query, update, createReal, queryReal, updateReal, updateIsPermanentUser,findUserByEmail,deleteRealUser,deleteTmpUser,disableRealUser,getAllUser};

/**
async function test() {
    await sql.query("UPDATE tmp_user SET is_permanent_user = false WHERE name = 'jingyuan';");
    //await sql.query("DELETE FROM tmp_user WHERE internal_user_id='HX0EYlfisd78qEctycVC'");
    const hashEmail = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update("jingyuanz534@gmail.com").digest("hex");
    await sql.query("DELETE FROM user WHERE internal_user_id= ? ", [hashEmail]);
    //await sql.query("DELETE FROM user_assessment_result WHERE internal_user_id='HX0EYlfisd78qEctycVC' OR internal_user_id= ?", [hashEmail]);
    await sql.query("Update user_assessment_result SET internal_user_id = ? WHERE internal_user_id = ?", ['HX0EYlfisd78qEctycVC', hashEmail]);
    return;
}

export default { User, create, query, update, createReal, queryReal, updateReal, updateIsPermanentUser, test };
*/
