import ExploreCommentModel from "../../models/exploreComment.js";

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
    let data = await ExploreCommentModel.getForExplore(req.query.explore_id);    

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


export default { index,create };