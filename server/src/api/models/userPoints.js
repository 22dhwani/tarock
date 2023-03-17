import sql from "../../config/db.js";

const UserPointsModal = {

    async addPoints(user_id, points, type, action) {
        const data = await sql.query("INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);", [user_id, points, type, action]);
        return data[0];

    },

    async pointsList(user_id) {
        const data = await sql.query(`SELECT * FROM user_points WHERE user_id = '${user_id}'`);
        return data[0];

    },

    async dailyCheckin(user_id) {
        const data = await sql.query("SELECT created_at FROM user_points WHERE created_at > current_timestamp()")
        return data[0];
    },

    async addDailyLoginPoints(user_id) {
        const data = await sql.query("INSERT INTO user_points (id, user_id, points,type,action,created_at,updated_at) VALUES (NULL, ?,?,?,?,current_timestamp(),NULL);", [user_id, 2, "ADDED", "DAILY_CHECK_IN"])
        return data[0];
    }

}
export default UserPointsModal;