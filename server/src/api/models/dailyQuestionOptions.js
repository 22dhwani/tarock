import sql from "../../config/db.js";

const DailyQuestionOptionModel = {

	async index(questionId) {
		const data = await sql.query("SELECT * FROM daily_questions_options WHERE question_id = ?", [questionId]);
		return data[0];
	}
}

export default DailyQuestionOptionModel