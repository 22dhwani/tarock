import sql from "../../config/db.js";

const UserToExplore = function(userToExplore) {
    this.id = userToExplore.id;
    this.explore_id = userToExplore.explore_id;
    this.internal_user_id = userToExplore.internal_user_id;
    this.created_at = userToExplore.created_at;
    this.updated_at = userToExplore.updated_at;
}

async function getByIds(explore_id,internal_user_id) {
    const data = await sql.query("SELECT * FROM user_to_explore WHERE `explore_id` = ? AND `internal_user_id` = ?;",[explore_id,internal_user_id]);
    return data[0];
}

async function deleteByIds(explore_id,internal_user_id) {
    const data = await sql.query("DELETE FROM user_to_explore WHERE `explore_id` = ? AND `internal_user_id` = ?;",[explore_id,internal_user_id]);
    return data[0];
}

async function createByIds(explore_id,internal_user_id) {
    const data = await sql.query("INSERT INTO user_to_explore (`id`, `explore_id`, `internal_user_id`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, current_timestamp(), current_timestamp());",[explore_id,internal_user_id]);
    return data[0];
}


export default { UserToExplore,getByIds,deleteByIds ,createByIds};