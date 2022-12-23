import sql from "../../config/db.js";

const Match = function(match) {
    this.origUserId = match.origUserId;
    this.matchedUserId = match.matchedUserId;
}

async function query(id) {
    const data = await sql.query("SELECT * FROM user_match WHERE orig_user_id = ? OR matched_user_id = ?;", [id, id]);
    return data[0];
};

async function create(match) {
    const data = await sql.query("SELECT * FROM user_match WHERE orig_user_id = ? AND matched_user_id = ? OR orig_user_id = ? AND matched_user_id = ? LIMIT 1;", [match.origUserId, match.matchedUserId, match.matchedUserId, match.origUserId]);
    if (data[0].length > 0) {
        throw new Error("Duplicated pair.");
    }
    const data2 = await sql.query("INSERT INTO user_match (orig_user_id, matched_user_id) SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM user_match WHERE orig_user_id = ? AND matched_user_id = ? OR orig_user_id = ? AND matched_user_id = ? LIMIT 1);", [match.origUserId, match.matchedUserId, match.origUserId, match.matchedUserId, match.matchedUserId, match.origUserId]);
    return data2[0];
}

async function deleteId(id){
    const data = await sql.query("DELETE FROM user_match WHERE id = ?",[
        id,
    ])
    return data[0];
}


export default { Match, query, create,deleteId} ;
