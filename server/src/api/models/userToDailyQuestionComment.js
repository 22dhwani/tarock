import sql from "../../config/db.js";

const UserToDailyQuestionComment = {

	async checkExists(commentId,userId) {
		const data = await sql.query("SELECT * FROM user_to_daily_questions_comments WHERE user_id = ? AND comment_id = ?", [userId,commentId]);
		return data[0];
	},

    async deleteLike(commentId,userId){
        const data = await sql.query("DELETE FROM user_to_daily_questions_comments WHERE user_id = ? AND comment_id = ?",[userId,commentId]);
        return data[0];
    },

    async addLike(commentId,userId){
        const data = await sql.query("INSERT INTO user_to_daily_questions_comments (`id`, `user_id`, `comment_id`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, current_timestamp(), current_timestamp()) ",[userId,commentId]);
        return data[0];
    },

    async updateCount(commentId){
        const count = await sql.query("SELECT COUNT(id) as likes FROM user_to_daily_questions_comments WHERE comment_id = ?;",[commentId]);

        await sql.query("UPDATE `daily_questions_commnets` SET `like_count` = ? WHERE `daily_questions_commnets`.`id` = ?",[count[0][0].likes,commentId])

        return true;
    }

}

export default UserToDailyQuestionComment