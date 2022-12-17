import DailyQuestionModel from "../../models/dailyQuestion.js";
import DailyQuestionOptionModel from "../../models/dailyQuestionOptions.js";
import DailyQuestionUserAnswerOptionModel from "../../models/dailyQuestionUserAnswer.js";
import sql from "../../../config/db.js";

async function index(req, res) {

	let data = await DailyQuestionModel.index()

	res.json({
		message: "success",
		status: 1,
	});

}
async function answer(req, res) {
	let user = res.user
	const { question_id, answer_id } = req.body

	if(!question_id){
        res.status(422).json(
            {
                message:"question_id is required",
                status: 0,
            }
        );
        return;
    }   
	if(!answer_id){
        res.status(422).json(
            {
                message:"answer_id is required",
                status: 0,
            }
        );
        return;
    }   

	let data = await DailyQuestionUserAnswerOptionModel.checkExist(user.internal_user_id, question_id)
	if(data.length > 0){
		res.status(422).json(
			{
				message:"You have already asnwered this question",
				status: 0,
			}
		);
		return;
	}
	data = await DailyQuestionUserAnswerOptionModel.addAnswer(user.internal_user_id, question_id, answer_id)


	let options = await DailyQuestionOptionModel.indexWithCount(question_id)
	let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswers(question_id)
	res.json({
		data : {
			"total_answers":totalAnswers.length,
			"answers_count":options
		},
		message: "Answer Submitted",
		status: 1,
	});

}
async function getTodayQuestion(req,res){
	let data = await DailyQuestionModel.getActiveFirst()
	if(data.length <= 0){
		res.status(422).json(
            {
                message:"No question for today",
                status: 0,
            }
        );
        return;
	}
	
	data[0].options = await DailyQuestionOptionModel.index(data[0].id)
	res.json({
		data: data[0],
		message: "success",
		status: 1,
	});
}

async function getStats(req,res){

	let user = res.user
	const { question_id } = req.query
	if(!question_id){
        res.status(422).json(
            {
                message:"question_id is required",
                status: 0,
            }
        );
        return;
    } 
	let options = await DailyQuestionOptionModel.indexWithCount(question_id)
	let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswers(question_id)


	res.json({
		data : {
			"total_answers":totalAnswers.length,
			"answers_count":options
		},
		message: "stats returned",
		status: 1,
	});
}

async function getAnswer(req,res){
	let user = res.user
	const { question_id } = req.query
	if(!question_id){
        res.status(422).json(
            {
                message:"question_id is required",
                status: 0,
            }
        );
        return;
    } 
	let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswer(question_id,user.internal_user_id)
	if(totalAnswers.length <= 0){
		res.status(422).json(
            {
                message:"Not asnwered yet",
                status: 0,
            }
        );
        return;
	}

	res.json({
		data : totalAnswers[0],
		message: "Submitted Answer returned",
		status: 1,
	});
}



export default { index, answer,getTodayQuestion ,getStats,getAnswer};