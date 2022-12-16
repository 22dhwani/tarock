import DailyQuestionModel from "../../models/dailyQuestion.js";
import sql from "../../../config/db.js";

async function index(req, res) {

	let data = await DailyQuestionModel.index()
	let options = [];
	if (!data.length) {
		res.json({
			data: null,
			message: "no data",
			status: 0,
		});
	}

	var id = data[0].id;
	options = await sql.query("SELECT id, `option` FROM daily_questions_options WHERE question_id = ?;", [id])

	res.json({
		data: {...data[0], options: options[0]},
		// options: options[0],
		message: "success",
		status: 1,
	});

}



export default { index };