import userPoints from "../../models/userPoints.js";
// import UserPointsModal from "../../models/userPoint.js";

function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  console.log(year + "-" + month + "-" + day);
  return year + "-" + month + "-" + day;
}
//adding user points
async function addUserPoint(req, res) {
  try {
    const data = await userPoints.addPoints(
      res.user.internal_user_id,
      req.body.points,
      req.body.type,
      req.body.action
    );
    res.json({
      data: data,
      message: "User Points created",
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

//listing the points
async function userPointsList(req, res) {
  try {
    const data = await userPoints.listPoints(res.user.internal_user_id);
    res.json({
      data: data,
      message: "User Points listed",
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
async function totalUserPoints(req, res) {
  try {
    const data = await userPoints.totalPointsForLoginUser(
      res.user.internal_user_id
    );
    console.log(data);
    res.json({
      totalPoints: data,
      message: "User Points are summed up",
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
async function dailyLoginPoint(req, res) {
  try {
    const data = await userPoints.dailyLoginPoint(res.user.internal_user_id);
    res.json({
      data: data,
      message: "User Points for Daily check in",

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
export default {
  addUserPoint,
  userPointsList,
  totalUserPoints,
  dailyLoginPoint,
};
