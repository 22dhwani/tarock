import ExploreCommentModel from "../../models/exploreComment.js";
import UserToCommentModel from "../../models/userToComment.js";

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
    res.json(
        {
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