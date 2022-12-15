import sql from "../../config/db.js";

const UserToComment = function(userToComment) {
    this.id = userToComment.id;
    this.explore_id = userToComment.explore_id;
    this.internal_user_id = userToComment.internal_user_id;
    this.created_at = userToComment.created_at;
    this.updated_at = userToComment.updated_at;
}

async function getByIds(comment_id,internal_user_id) {
    const data = await sql.query("SELECT * FROM user_to_comment WHERE `explore_comment_id` = ? AND `internal_user_id` = ?;",[comment_id,internal_user_id]);
    return data[0];
}

async function deleteByIds(comment_id,internal_user_id) {
    const data = await sql.query("DELETE FROM user_to_comment WHERE `explore_comment_id` = ? AND `internal_user_id` = ?;",[comment_id,internal_user_id]);
    return data[0];
}

async function createByIds(comment_id,internal_user_id) {
    const data = await sql.query("INSERT INTO user_to_comment (`id`, `explore_comment_id`, `internal_user_id`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, current_timestamp(), current_timestamp());",[comment_id,internal_user_id]);
    return data[0];
}


export default { UserToComment,getByIds,deleteByIds ,createByIds};