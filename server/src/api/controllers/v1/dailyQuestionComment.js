import fs from 'fs';
import path from 'path';
import DailyQuestionModel from "../../models/dailyQuestion.js";
import DailyQuestionOptionModel from "../../models/dailyQuestionOptions.js";
import DailyQuestionUserAnswerOptionModel from "../../models/dailyQuestionUserAnswer.js";
import sql from "../../../config/db.js";
import DailyQuestionCommentModel from "../../models/dailyQuestionComment.js";
import UserToDailyQuestionComment from "../../models/userToDailyQuestionComment.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const tarockJsonData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));
async function index(req, res) {
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
	let data = await DailyQuestionCommentModel.index(question_id,user.internal_user_id)
    data.map((d)=>{
        if(d.result_code){
            d.personality_category = tarockJsonData[d.result_code]?.personality_category
        }else{
            d.personality_category = null
        }
        return d
    })
	res.json({
        data: data,
		message: "success",
		status: 1,
	});

}

async function addComment(req,res){
    let user = res.user
	const { question_id,content } = req.body
	if(!question_id){
        res.status(422).json(
            {
                message:"question_id is required",
                status: 0,
            }
        );
        return;
    } 
    if(!content){
        res.status(422).json(
            {
                message:"content is required",
                status: 0,
            }
        );
        return;
    } 
    let data = await DailyQuestionCommentModel.addComment(user.internal_user_id,question_id,content)


    // insertId
    const item = await sql.query("SELECT * FROM explore_comments WHERE id = ?;",[data.insertId])
    res.json({
        data: item[0][0],
		message: "Comment Added",
		status: 1,
	});
}

async function likeToggle(req,res){
    let user = res.user
	const { comment_id } = req.body
	if(!comment_id){
        res.status(422).json(
            {
                message:"comment_id is required",
                status: 0,
            }
        );
        return;
    } 
    let exists = await UserToDailyQuestionComment.checkExists(comment_id,user.internal_user_id)
    if(exists.length > 0){
        await UserToDailyQuestionComment.deleteLike(comment_id,user.internal_user_id)
    }else{
        await UserToDailyQuestionComment.addLike(comment_id,user.internal_user_id)   
    }
    await UserToDailyQuestionComment.updateCount(comment_id)   

    res.json({
		message: "Like Toggled",
		status: 1,
	});
}


export default { index,addComment,likeToggle };