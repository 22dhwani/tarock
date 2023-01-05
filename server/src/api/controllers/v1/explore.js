import ExploreModel from "../../models/explore.js";
import UserToExploreModel from "../../models/userToExplore.js";

async function index(req,res){          
    let data = await ExploreModel.getForUser(res.user.internal_user_id);    
    data.map((d)=>{
        d.like_count = (parseInt(d.like_count) + 300)
    })
    res.json(
        {
            data: data,
            message: "Explore returned",
            status: 1,
        }
    );
    
}

async function likeToggle(req,res){
    let user = res.user
    if(!req.body.explore_id){
        res.status(422).json(
            {
                message:"Explore Id is required",
                status: 0,
            }
        );
        return;
    }
    try {
        let userToExpore = await UserToExploreModel.getByIds(req.body.explore_id,user.internal_user_id)

        if(userToExpore.length > 0){
            await UserToExploreModel.deleteByIds(req.body.explore_id,user.internal_user_id)
           
        }else{
            await UserToExploreModel.createByIds(req.body.explore_id,user.internal_user_id)
        }
    
        await ExploreModel.updateLikes(req.body.explore_id)        
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

export default { index,likeToggle };