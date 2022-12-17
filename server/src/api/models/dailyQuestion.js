import sql from "../../config/db.js";

const DailyQuestionModel = {

	async index() {
		const data = await sql.query("select * FROM daily_questions;");
		return data[0];
	},

	async getActiveFirst() {
		const data = await sql.query("select * FROM daily_questions WHERE is_active = 1 LIMIT 1;");
		return data[0];
	},

	async answer(userId, questionId, answerId) {
		const data = await sql.query("INSERT INTO daily_questions_user_answers (user_id, question_id, answer_id) VALUES (?, ?, ?);", [userId, questionId, answerId]);
		return data[0];
	}

}

export default DailyQuestionModel