import fs from 'fs';
import path from 'path';
import ExploreCommentModel from "../../models/exploreComment.js";
import UserToCommentModel from "../../models/userToComment.js";
import sql from "../../../config/db.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const tarockJsonData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));

async function index(req,res){      
    
    if(!req.query.explore_id){
        res.status(422).json(
            {
                message:"Explore ID is required",
                status: 0,
            }
        );
        return;
    }    
    let user = res.user
    let data = await ExploreCommentModel.getForExplore(req.query.explore_id, user.internal_user_id);

    data.map((d)=>{
        if(d.result_code){
            d.personality_category = tarockJsonData[d.result_code]?.personality_category
        }else{
            d.personality_category = null
        }
        return d
    })

    res.json(
        {
            data: data,
            message: "Explore Comments returned returned",
            status: 1,
        }
    );
    
}

async function create(req,res){
    if(!req.body.explore_id){
        res.status(422).json(
            {
                message:"Explore ID is required",
                status: 0,
            }
        );
        return;
    } 
    if(!req.body.user_id){
        res.status(422).json(
            {
                message:"user ID is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.content){
        res.status(422).json(
            {
                message:"Content is required",
                status: 0,
            }
        );
        return;
    } 

    let data = await ExploreCommentModel.addComment(
        req.body.explore_id,
        req.body.user_id,
        req.body.content
    );    

    // To update count for exlore 
    const count = await sql.query("SELECT COUNT(id) as comments FROM explore_comments WHERE explore_id = ?;",[req.body.explore_id]);
    await sql.query("UPDATE `explore` SET `comment_count` = ? WHERE `explore`.`id` = ?",[count[0][0].comments,req.body.explore_id])

    // insertId
    const item = await sql.query("SELECT explore_comments.* , user.name,user.avatar_index,user_avatars.face_index,user_avatars.hair_index,user_avatars.eyebrow_index,user_avatars.eye_index,user_avatars.nose_index,user_avatars.whiskers_index,user_avatars.beard_index,user_avatars.lips_index,user_avatars.ear_index,user_avatars.glasses_index,user_assessment_result.result_code, CASE WHEN EXISTS(select * from user_to_comment where `user_to_comment`.`internal_user_id` = ? AND `user_to_comment`.`explore_comment_id` = explore_comments.id) then 1 else 0 end as is_liked FROM explore_comments LEFT JOIN user ON explore_comments.internal_user_id = user.internal_user_id LEFT JOIN user_avatars ON user.internal_user_id = user_avatars.internal_user_id LEFT JOIN user_assessment_result ON user.internal_user_id = user_assessment_result.internal_user_id WHERE explore_comments.id = ? ORDER BY created_at DESC;",[req.body.user_id,data.insertId])    

    res.json(
        {
            data: item[0][0],
            message: 'Comment Added',
            status: 1,
        }
    );
}

async function likeToggle(req,res){
    let user = res.user
    if(!req.body.comment_id){
        res.status(422).json(
            {
                message:"Comment Id is required",
                status: 0,
            }
        );
        return;
    }
    try {
        let userToComment = await UserToCommentModel.getByIds(req.body.comment_id,user.internal_user_id)

        if(userToComment.length > 0){
            await UserToCommentModel.deleteByIds(req.body.comment_id,user.internal_user_id)           
        }else{
            await UserToCommentModel.createByIds(req.body.comment_id,user.internal_user_id)
        }
    
        await ExploreCommentModel.updateLikes(req.body.comment_id)        
    } catch (error) {

        res.status(422).json(
            {
                error:error.message,
                message:"something went wrong",
                status: 0,
            }
        );
        return
        
    }   

    res.json(
        {
            message: "UPDATED",
            status: 1,
        }
    );
}


export default { index,create,likeToggle };