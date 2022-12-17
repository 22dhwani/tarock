import sql from "../../config/db.js";

const DailyQuestionUserAnswerOptionModel = {

	async checkExist(userId,questionId) {
		const data = await sql.query("SELECT * FROM daily_questions_user_answers WHERE user_id = ? AND question_id = ?", [userId,questionId]);
		return data[0];
	},

    async addAnswer(userId,questionId,answerId) {
        const data = await sql.query("INSERT INTO daily_questions_user_answers (user_id, question_id, answer_id) VALUES (?, ?, ?);", [userId, questionId, answerId]);
		return data[0];
	},

    async getAnswers(questionId,answerId=null) {
		if(answerId == null){
			const data = await sql.query("SELECT * FROM daily_questions_user_answers WHERE question_id = ?", [questionId]);
			return data[0];
		}else{
			const data = await sql.query("SELECT * FROM daily_questions_user_answers WHERE question_id = ? AND answer_id = ?", [questionId,answerId]);
			return data[0];
		}
	},

    async getAnswer(questionId,userId) {
        const data = await sql.query("SELECT * FROM daily_questions_user_answers WHERE question_id = ? AND user_id = ?", [questionId,userId]);
		return data[0];
	}
}

export default DailyQuestionUserAnswerOptionModel