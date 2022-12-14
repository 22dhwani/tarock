import sql from "../../config/db.js";

const ExploreComment = function(exploreComment) {
    this.id = exploreComment.id;
    this.explore_id = exploreComment.explore_id;
    this.internal_user_id = exploreComment.internal_user_id;
    this.content = exploreComment.content;
    this.like_count = exploreComment.like_count;
}

async function getForExplore(exploreId) {
    const data = await sql.query("SELECT explore_comments.* , user.name,user.avatar_index FROM explore_comments LEFT JOIN user ON explore_comments.internal_user_id = user.internal_user_id WHERE explore_id = ? ORDER BY created_at DESC;",[exploreId]);
    return data[0];
}

async function addComment(exploreId,userId,content) {
    const data = await sql.query("INSERT INTO explore_comments (`id`, `explore_id`, `internal_user_id`, `content`, `like_count`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, '0', current_timestamp(), current_timestamp()) ",[exploreId,userId,content]);
    return data[0];
}

export default { ExploreComment,getForExplore,addComment };