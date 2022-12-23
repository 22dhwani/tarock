import sql from "../../config/db.js";

const UserRateModel = {

	async addRating(ownerId,raterId,question,answer) {
		const data = await sql.query("INSERT INTO user_rates (`id`, `owner_id`, `rater_id`, `question`, `answer`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, current_timestamp(), current_timestamp())",[
            ownerId,
            raterId,
            question,
            answer]);
		return data[0];
	},

	async findByIds(ownerId,raterId) {
		const data = await sql.query("select * FROM user_rates WHERE owner_id = ? AND rater_id = ?;",[ownerId,raterId]);
		return data[0];
	},

    async findByQuestion(ownerId,raterId,question){
        const data = await sql.query("select * FROM user_rates WHERE owner_id = ? AND rater_id = ? AND question = ?;",[ownerId,raterId,question]);
		return data[0];
    },

    async removeById(id){
        const data = await sql.query("DELETE FROM user_rates WHERE id = ?",[id]);
		return data[0];
    },

	async removeByIds(ownerId,raterId){
        const data = await sql.query("DELETE FROM user_rates WHERE owner_id = ? AND rater_id = ?",[ownerId,raterId]);
		return data[0];
    },

    async removeByQuestion(ownerId,raterId,question){
        const data = await sql.query("DELETE FROM user_rates WHERE owner_id = ? AND rater_id = ? AND question = ?",[ownerId,raterId,question]);
		return data[0];
    },

}

export default UserRateModel 