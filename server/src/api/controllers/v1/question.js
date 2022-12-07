import Assessment from "../../models/assessment.js";

async function getQuestion(req,res){        


    if(!req.query.group_id){
        res.status(422).json(
            {
                message:"group id is required",
                status: 0,
            }
        );
    }

    try {
        const data = await Assessment.getAllByGroupId(req.query.group_id);
        res.json(
            {
                data:data,
                message:"Questions returned",
                status: 1,
            }
        );
    } catch (error) {
        res.status(422).json(
            {
                message:error,
                status: 0,
            }
        );
    }
}

export default { getQuestion };