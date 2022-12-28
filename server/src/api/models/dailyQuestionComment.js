import sql from "../../config/db.js";

const DailyQuestionCommentModel = {

	async index(questionId,userId) {
        const data = await sql.query("SELECT daily_questions_commnets.* , user.name,user.avatar_index,user_avatars.face_index,user_avatars.hair_index,user_avatars.eyebrow_index,user_avatars.eye_index,user_avatars.nose_index,user_avatars.whiskers_index,user_avatars.beard_index,user_avatars.lips_index,user_avatars.ear_index,user_avatars.glasses_index,user_assessment_result.result_code, CASE WHEN EXISTS(select * from user_to_daily_questions_comments where `user_to_daily_questions_comments`.`user_id` = ? AND `user_to_daily_questions_comments`.`comment_id` = daily_questions_commnets.id) then 1 else 0 end as is_liked FROM daily_questions_commnets LEFT JOIN user ON daily_questions_commnets.user_id = user.internal_user_id LEFT JOIN user_avatars ON user.internal_user_id = user_avatars.internal_user_id LEFT JOIN user_assessment_result ON user.internal_user_id = user_assessment_result.internal_user_id WHERE question_id = ? ORDER BY created_at DESC;",[userId,questionId]);
        return data[0];
	},

    async addComment(userId,questionId,content){
        const data = await sql.query("INSERT INTO daily_questions_commnets (`id`, `user_id`, `question_id`, `content`, `like_count`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, '0', current_timestamp(), current_timestamp()) ",[userId,questionId,content]);
        return data[0];
    }

}

export default DailyQuestionCommentModel