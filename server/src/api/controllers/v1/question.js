import Assessment from "../../models/assessment.js";
import ResultController from "../../controllers/result.js";
import ResultModel from "../../models/result.js";
import Result from '../../models/result.js';

async function getQuestion(req,res){        
    if(!req.query.group_id){
        res.status(422).json(
            {
                message:"group id is required",
                status: 0,
            }
        );
        return;
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
                message:error.message,
                status: 0,
            }
        );
        return;
    }
}

async function addResult(req,res){

    const result = new ResultModel.Result({
        userId: req.body.device_id,
        assessmentGroupId: req.body.assessment_group_id,
        numOfQuestions: req.body.answers.length,
        duration: req.body.duration,
        code: ResultController.getSocionicsResult(req.body.answers)
    });
                    
    try {
        await ResultModel.create(result);
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
            message:"Result added",
            status: 1,
        }
    );
}

async function updateResult(req,res){

    let user = res.user

    let result= await ResultModel.getByUser(user.internal_user_id)
    if(result.length <=0 ){
        const newResult = new Result.Result({
            userId: user.internal_user_id,
            assessmentGroupId: req.body.assessment_group_id,
            numOfQuestions: req.body.answers.length,
            duration: req.body.duration,
            code: ResultController.getSocionicsResult(req.body.answers)
          });
        await Result.create(newResult);
        result = await ResultModel.getByUser(user.internal_user_id)
    }
                    
    try {
        await ResultModel.update(
            result[0].id,
            req.body.assessment_group_id,
            req.body.answers.length,
            req.body.duration,
            ResultController.getSocionicsResult(req.body.answers)
        )
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
            message:"Result Updated",
            status: 1,
        }
    );
}

export default { getQuestion,addResult,updateResult };