import PersonalityInsightModel from "../../models/personalityInsight.js";

async function index(req,res){  
    if(!req.query.code){
        res.status(422).json(
            {
                message:"code is required",
                status: 0,
            }
        );
        return;
    }
    let code = req.query.code;
    
    let data = await PersonalityInsightModel.getForCode(code);
    res.json(
        {
            data: data,
            message: "Personality Insight returned",
            status: 1,
        }
    );
    
}


export default { index };