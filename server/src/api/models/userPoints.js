import sql from "../../config/db.js";

const UserPointsModal = {
  async addPoints(user_id, points, type, action) {
    const data = await sql.query(
      "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
      [user_id, points, type, action]
    );
    return data[0];
  },
  async listPoints(user_id) {
    const data = await sql.query(
      `SELECT * FROM user_points WHERE user_id ='${user_id}' ;`
    );
    return data[0];
  },

  async totalPointsForLoginUser(user_id) {
    let sum = 0;
    const added_points = await sql.query(
      `SELECT SUM(points) as sum FROM user_points WHERE user_id ='${user_id}' AND type= 'ADDED' ;`
    );
    const taken_points = await sql.query(
      `SELECT SUM(points) as sum FROM user_points WHERE user_id ='${user_id}' AND type= 'TAKEN' ;`
    );

    sum = added_points[0][0].sum - taken_points[0][0].sum;
    console.log(sum);
    return sum;
  },

  async dailyLoginPoint(user_id) {
    //check whther a user has already login or not
    const current_date = new Date();
    let day = current_date.getDate();
    let month = current_date.getMonth() + 1;
    let year = current_date.getFullYear();
    const formattedDate = `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }`;

    const enteredRecord = await sql.query(
      `SELECT * FROM user_points WHERE CAST(created_at  AS DATE) = '${formattedDate}' AND (action = 'SEVEN_DAILY_CHECK_IN' OR action = 'DAILY_CHECK_IN') AND user_id ='${user_id}';`
    );
    let countOfCurrentLogin = enteredRecord[0].length;
    const newData = await sql.query(
      `SELECT created_at  FROM user_points WHERE user_id ='${user_id}' AND (action = 'SEVEN_DAILY_CHECK_IN' OR action='DAILY_CHECK_IN');`
    );
    const lastRecord = JSON.stringify(newData[0][newData[0].length - 1])
      .split("T")[0]
      .split('"');
    const lastDateOfSevenDay = lastRecord.pop();
    let data = await sql.query(
      `SELECT created_at  FROM user_points WHERE (created_at > '${lastDateOfSevenDay}' )  AND action ='DAILY_CHECK_IN' AND user_id ='${user_id}' ;`
    );
    let count = data[0].length;
    console.log("count", count);
    const gap = await sql.query(
      `SELECT created_at, DATEDIFF((LEAD(created_at) OVER (ORDER BY created_at)) , created_at) as Gap FROM user_points ORDER BY created_at`
    );

    const row = gap[0][gap[0].length - 2];
    const streak = row.Gap;
    //  enter a record if the user has not checked in yet
    if (countOfCurrentLogin < 1 && streak == 1) {
      let last_break = row.created_at;
      const last_info = JSON.stringify(last_break).split("T")[0].split('"')[1];
      const lastdata = await sql.query(
        `SELECT COUNT(created_at) as count FROM user_points WHERE (created_at > '${last_info}' AND action ="DAILY_CHECK_IN" AND user_id ='${user_id}')`
      );

      let new_count = count - lastdata[0][0].count;
      console.log("new count", new_count);
      if (new_count >= 6) {
        const newQuery = await sql.query(
          "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
          [user_id, 10, "ADDED", "SEVEN_DAILY_CHECK_IN"]
        );
        count = 0;
        return newQuery[0];
      } else if (new_count < 6) {
        const newQuery = await sql.query(
          "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
          [user_id, 2, "ADDED", "DAILY_CHECK_IN"]
        );
        return newQuery[0];
      }
      return newData;
    } else if (countOfCurrentLogin >= 1) {
      return "you cannot redeem points more than once";
    } else if (streak > 1) {
      count = 0;
      console.log("count", count);
      const data = await sql.query(
        "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
        [user_id, 2, "ADDED", "DAILY_CHECK_IN"]
      );
      return data[0];
    }
  },

  async addPoints(user_id, points, type, action) {
    const data = await sql.query(
      "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
      [user_id, points, type, action]
    );
    return data[0];
  },

  async pointsList(user_id) {
    const data = await sql.query(
      `SELECT * FROM user_points WHERE user_id = '${user_id}'`
    );
    return data[0];
  },

  async dailyCheckin(user_id) {
    const data = await sql.query(
      "SELECT created_at FROM user_points WHERE created_at > current_timestamp()"
    );
    return data[0];
  },

  async addDailyLoginPoints(user_id) {
    const data = await sql.query(
      "INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);",
      [user_id, 2, "ADDED", "DAILY_CHECK_IN"]
    );
    return data[0];
  },
};
export default UserPointsModal;
