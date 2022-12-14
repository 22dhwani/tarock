import ExploreModel from "../../models/explore.js";

async function index(req,res){          
    let data = await ExploreModel.getForUser(res.user.internal_user_id);    
    res.json(
        {
            data: data,
            message: "Explore returned",
            status: 1,
        }
    );
    
}

export default { index };