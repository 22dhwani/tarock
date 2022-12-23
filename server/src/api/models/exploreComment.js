import sql from "../../config/db.js";

const ExploreComment = function(exploreComment) {
    this.id = exploreComment.id;
    this.explore_id = exploreComment.explore_id;
    this.internal_user_id = exploreComment.internal_user_id;
    this.content = exploreComment.content;
    this.like_count = exploreComment.like_count;
}

async function getForExplore(exploreId,internal_user_id) {
    const data = await sql.query("SELECT explore_comments.* , user.name,user.avatar_index,user_avatars.face_index,user_avatars.hair_index,user_avatars.eyebrow_index,user_avatars.eye_index,user_avatars.nose_index,user_avatars.whiskers_index,user_avatars.beard_index,user_avatars.lips_index,user_avatars.ear_index,user_avatars.glasses_index, CASE WHEN EXISTS(select * from user_to_comment where `user_to_comment`.`internal_user_id` = ? AND `user_to_comment`.`explore_comment_id` = explore_comments.id) then 1 else 0 end as is_liked FROM explore_comments LEFT JOIN user ON explore_comments.internal_user_id = user.internal_user_id LEFT JOIN user_avatars ON user.internal_user_id = user_avatars.internal_user_id WHERE explore_id = ? ORDER BY created_at DESC;",[internal_user_id,exploreId]);
    return data[0];
}

async function addComment(exploreId,userId,content) {
    const data = await sql.query("INSERT INTO explore_comments (`id`, `explore_id`, `internal_user_id`, `content`, `like_count`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, '0', current_timestamp(), current_timestamp()) ",[exploreId,userId,content]);
    return data[0];
}

async function updateLikes(id) {
    const count = await sql.query("SELECT COUNT(id) as likes FROM user_to_comment WHERE explore_comment_id = ?;",[id]);

    await sql.query("UPDATE `explore_comments` SET `like_count` = ? WHERE `explore_comments`.`id` = ?",[count[0][0].likes,id])

    return true;
}

export default { ExploreComment,getForExplore,addComment,updateLikes };