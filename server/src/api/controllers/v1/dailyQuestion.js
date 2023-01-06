import fs from 'fs';
import path from 'path';
import DailyQuestionModel from "../../models/dailyQuestion.js";
import DailyQuestionOptionModel from "../../models/dailyQuestionOptions.js";
import Result from '../../models/result.js';
import DailyQuestionUserAnswerOptionModel from "../../models/dailyQuestionUserAnswer.js";
import sql from "../../../config/db.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const dir = dirname(fileURLToPath(import.meta.url));
const cardData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));

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

	await Promise.all(options.map(async (option) => {
		let personalies = []
		let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswers(question_id,option.id)
		let tarcokResult = null

		for await (const answer of totalAnswers) {
			tarcokResult = await Result.getByUser(answer.user_id)
			if (tarcokResult.length > 0) {
				let personality_name = cardData[tarcokResult[0].result_code].personality_category
				if(!personalies.some((element)=>{return element.personality_name == personality_name})){
					personalies.push(
						{
							personality_name:personality_name,
							count:1
						}
					)
				}else{
					let personality_index = personalies.findIndex((obj => obj.personality_name == personality_name));
					personalies[personality_index].count = personalies[personality_index].count + 1
				}				
			}
		};

		option.total_personality_answers= totalAnswers.length
		option.personalies= personalies
	}))
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


	await Promise.all(options.map(async (option) => {
		let personalies = []
		let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswers(question_id,option.id)
		let tarcokResult = null

		for await (const answer of totalAnswers) {
			tarcokResult = await Result.getByUser(answer.user_id)
			if (tarcokResult.length > 0) {
				let personality_name = cardData[tarcokResult[0].result_code].personality_category
				if(!personalies.some((element)=>{return element.personality_name == personality_name})){
					personalies.push(
						{
							personality_name:personality_name,
							count:1
						}
					)
				}else{
					let personality_index = personalies.findIndex((obj => obj.personality_name == personality_name));
					personalies[personality_index].count = personalies[personality_index].count + 1
				}				
			}
		};
		personalies = personalies.sort((a,b)=>b.count-a.count);
		option.total_personality_answers= totalAnswers.length
		option.personalies= personalies
	}))

	res.json({
		data : {
			"total_answers":totalAnswers.length,
			"answers_count":options
		},
		message: "stats returned",
		status: 1,
	});
}

async function getOptionStats(req,res){
	let user = res.user
	const { question_id ,option_id} = req.query
	if(!question_id){
        res.status(422).json(
            {
                message:"question_id is required",
                status: 0,
            }
        );
        return;
    } 
	if(!option_id){
        res.status(422).json(
            {
                message:"option_id is required",
                status: 0,
            }
        );
        return;
    } 
	let personalies = []
	let totalAnswers = await DailyQuestionUserAnswerOptionModel.getAnswers(question_id,option_id)
	let tarcokResult = null
	for await (const answer of totalAnswers) {
		tarcokResult = await Result.getByUser(answer.user_id)
		if (tarcokResult.length > 0) {
			let personality_name = cardData[tarcokResult[0].result_code].personality_category
			if(!personalies.some((element)=>{return element.personality_name == personality_name})){
				personalies.push(
					{
						personality_name:personality_name,
						count:1
					}
				)
			}else{
				let personality_index = personalies.findIndex((obj => obj.personality_name == personality_name));
				personalies[personality_index].count = personalies[personality_index].count + 1
			}				
		}
	};

	res.json({
		data:{
			"total_answers":totalAnswers.length,
			"personalies":personalies
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



export default { index, answer,getTodayQuestion ,getStats,getAnswer,getOptionStats};