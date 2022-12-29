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
    const item = await sql.query("SELECT daily_questions_commnets.* , user.name,user.avatar_index,user_avatars.face_index,user_avatars.hair_index,user_avatars.eyebrow_index,user_avatars.eye_index,user_avatars.nose_index,user_avatars.whiskers_index,user_avatars.beard_index,user_avatars.lips_index,user_avatars.ear_index,user_avatars.glasses_index,user_assessment_result.result_code, CASE WHEN EXISTS(select * from user_to_daily_questions_comments where `user_to_daily_questions_comments`.`user_id` = ? AND `user_to_daily_questions_comments`.`comment_id` = daily_questions_commnets.id) then 1 else 0 end as is_liked FROM daily_questions_commnets LEFT JOIN user ON daily_questions_commnets.user_id = user.internal_user_id LEFT JOIN user_avatars ON user.internal_user_id = user_avatars.internal_user_id LEFT JOIN user_assessment_result ON user.internal_user_id = user_assessment_result.internal_user_id WHERE daily_questions_commnets.id = ? ORDER BY created_at DESC;",[user.internal_user_id,data.insertId])
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