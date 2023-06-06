import fs from "fs";
import path from "path";
import Assessment from "../../models/assessment.js";
import ResultController from "../../controllers/result.js";
import ResultModel from "../../models/result.js";
import Result from "../../models/result.js";
import UserRateModel from "../../models/userRates.js";
import UserAvatarModel from "../../models/userAvatar.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
const tarockJsonData = JSON.parse(
  fs.readFileSync(
    path.join(dir, "../../../../static/personality_code_definition.json")
  )
);
async function getQuestion(req, res) {
  if (!req.query.group_id) {
    res.status(422).json({
      message: "group id is required",
      status: 0,
    });
    return;
  }

  try {
    const data = await Assessment.getAllByGroupId(req.query.group_id);
    res.json({
      data: data,
      message: "Questions returned",
      status: 1,
    });
  } catch (error) {
    res.status(422).json({
      message: error.message,
      status: 0,
    });
    return;
  }
}

async function addResult(req, res) {
  const result = new ResultModel.Result({
    userId: req.body.device_id,
    assessmentGroupId: req.body.assessment_group_id,
    numOfQuestions: req.body.answers.length,
    duration: req.body.duration,
    code: ResultController.getSocionicsResult(req.body.answers),
  });

  try {
    await ResultModel.create(result);
  } catch (error) {
    res.status(422).json({
      error: error.message,
      message: "something went wrong",
      status: 0,
    });
    return;
  }

  res.json({
    message: "Result added",
    status: 1,
  });
}

async function rateResult(req, res) {
  let user = res.user;
  const { owner_id, data } = req.body;
  if (!owner_id) {
    res.status(422).json({
      message: "owner id is required",
      status: 0,
    });
    return;
  }
  if (!data) {
    res.status(422).json({
      message: "data is required",
      status: 0,
    });
    return;
  }
  try {
    await UserRateModel.removeByIds(owner_id, res.user.internal_user_id);
    for await (const d of data) {
      await UserRateModel.addRating(
        owner_id,
        res.user.internal_user_id,
        d["question"],
        d["answer"]
      );
    }
  } catch (error) {
    res.status(422).json({
      error: error.message,
      message: "something went Wrong",
      status: 0,
    });
    return;
  }

  res.json({
    message: "User rated",
    status: 1,
  });
}

async function updateResult(req, res) {
  let user = res.user;
  let result = await ResultModel.getByOldUser(user.internal_user_id); //changes
  let questionId =
    req.body.assessment_group_id === 1 ? 8 : req.body.assessment_group_id; //changes
  console.log(questionId); //changes
  if (result.length <= 0) {
    const newResult = new Result.Result({
      userId: user.internal_user_id,
      assessmentGroupId: questionId, //changes
      numOfQuestions: req.body.answers.length,
      duration: req.body.duration,
      code: tarockJsonData[
        ResultController.getSocionicsResult(req.body.answers)
      ].personality_mbti_code, //changes
      tarockSocionics: ResultController.getSocionicsResult(req.body.answers),
    });
    //   console.log(newResult);
    await Result.create(newResult);
    result = await ResultModel.getByOldUser(user.internal_user_id); //changes
  }

  try {
    await ResultModel.update(
      result[0].id,
      req.body.assessment_group_id === 1 ? 8 : req.body.assessment_group_id, //changes
      req.body.answers.length,
      req.body.duration,
      tarockJsonData[ResultController.getSocionicsResult(req.body.answers)]
        .personality_mbti_code, //changes
      ResultController.getSocionicsResult(req.body.answers)
    );
  } catch (error) {
    res.status(422).json({
      error: error.message,
      message: "something went wrong",
      status: 0,
    });
    return;
  }
  let userAvatar = await UserAvatarModel.getByUserId(user.internal_user_id);
  user.user_avatar = userAvatar[0] ?? null;
  user.question_data = null;

  const tarcokResult = await Result.getByOldUser(user.internal_user_id); //changes
  if (tarcokResult.length > 0) {
    const tarockData = tarockJsonData[tarcokResult[0].tarock_socionics]; //changes
    user.question_data = {
      resultCode: tarcokResult[0].tarock_socionics, //changes
      quadra: tarockData.personality_socionic_quadra,
    };
  }
  res.json({
    data: user,
    message: "Result Updated",
    status: 1,
  });
}

export default { getQuestion, addResult, updateResult, rateResult };
