import sql from "../../config/db.js";

const Result = function (result) {
  this.userId = result.userId;
  this.assessmentGroupId = result.assessmentGroupId;
  this.numOfQuestions = result.numOfQuestions;
  this.duration = result.duration;
  this.code = result.code;
};

const NewResult = function (result) {
  this.userId = result.userId;
  this.assessmentGroupId = result.assessmentGroupId;
  this.numOfQuestions = result.numOfQuestions;
  this.duration = result.duration;
  this.code = result.code;
  this.tarockSocionics = result.tarockSocionics;
};

const UpdateResult = function (result) {
  this.userId = result.userId;
  this.assessmentGroupId = result.assessmentGroupId;
  this.numOfQuestions = result.numOfQuestions;
  this.duration = result.duration;
  this.code = result.code;
  this.tarockSocionics = result.tarockSocionics;
};

const defaultAssessmentGroupId = 1;

async function getByUser(userId) {
  const data = await sql.query(
    "SELECT * FROM user_assessment_result WHERE internal_user_id = ? AND question_group_id = ? order by created_at desc limit 1;",
    [userId, defaultAssessmentGroupId]
  );
  return data[0];
}

async function getByOldUser(userId) {
  const data = await sql.query(
    "SELECT * FROM user_assessment_result WHERE internal_user_id = ? AND question_group_id = ? order by created_at desc limit 1;",
    [userId, 8]
  );
  return data[0];
}

async function getByUserNew(userId) {
    const data = await sql.query("SELECT * FROM user_assessment_result WHERE internal_user_id = ? AND question_group_id = ? order by created_at desc limit 1;", [userId, 8]);
    return data[0];
}

async function create(result) {
  //changes
  const data = await sql.query(
    "INSERT INTO user_assessment_result (internal_user_id, question_group_id, num_of_questions, duration, result_code) VALUES (?, ?, ?, ?, ?);",
    [
      result.userId,
      result.assessmentGroupId,
      result.numOfQuestions,
      result.duration,
      result.code,
    ]
  );
  return data[0];
}

async function newCreate(result) {
  //changes
  const data = await sql.query(
    "INSERT INTO user_assessment_result (internal_user_id, question_group_id, num_of_questions, duration, result_code, tarock_socionics) VALUES (?, ?, ?, ?, ?, ?);",
    [
      result.userId,
      result.assessmentGroupId,
      result.numOfQuestions,
      result.duration,
      result.code,
    ]
  );
  return data[0];
}

async function update(
  id,
  question_group_id,
  num_of_questions,
  duration,
  result_code,
  tarock_socionics
) {
  //changes
  const data = await sql.query(
    "UPDATE user_assessment_result SET question_group_id = ? ,num_of_questions =?,duration = ?,result_code=?, tarock_socionics=? WHERE id = ?;",
    [
      question_group_id,
      num_of_questions,
      duration,
      result_code,
      tarock_socionics,
      id,
    ]
  );
  return data[0];
}

export default {
  Result,
  NewResult,
  newCreate,
  UpdateResult,
  getByUser,
  getByOldUser,
  create,
  update,
};
