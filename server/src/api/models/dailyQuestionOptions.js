import sql from "../../config/db.js";

const DailyQuestionOptionModel = {

	async index(questionId) {
		const data = await sql.query("SELECT * FROM daily_questions_options WHERE question_id = ?", [questionId]);
		return data[0];
	},

	async indexWithCount(questionId) {
		const data = await sql.query("SELECT * , (SELECT COUNT(id) FROM daily_questions_user_answers WHERE daily_questions_user_answers.answer_id = daily_questions_options.id) AS answer_count FROM daily_questions_options WHERE question_id = ?", [questionId]);
		return data[0];
	}
}

export default DailyQuestionOptionModel