import DailyQuestionModel from "../../models/dailyQuestion.js";

async function index(req, res) {

	let data = await DailyQuestionModel.index()

	res.json({
		data: data.length ? data[0] : null,
		message: "success",
		status: 1,
	});

}



export default { index };