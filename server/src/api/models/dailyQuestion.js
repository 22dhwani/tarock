import sql from "../../config/db.js";

const DailyQuestionModel = {

	async index() {
		const data = await sql.query("select * FROM daily_questions;");
		return data[0];
	}

}

export default DailyQuestionModel