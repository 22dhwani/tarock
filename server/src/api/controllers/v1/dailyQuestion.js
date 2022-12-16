import DailyQuestionModel from "../../models/dailyQuestion.js";
import sql from "../../../config/db.js";

async function index(req, res) {

	let data = await DailyQuestionModel.index()

	res.json({
		message: "success",
		status: 1,
	});

}
async function answer(req, res) {

	const { user_id, question_id, answer_id } = req.body
	let data = await DailyQuestionModel.answer(user_id, question_id, answer_id)

	res.json({
		data: data,
		message: "success",
		status: 1,
	});

}



export default { index, answer };