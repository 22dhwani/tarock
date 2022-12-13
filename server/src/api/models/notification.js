import sql from "../../config/db.js";

const Notification = function(notification) {
    this.id = notification.id;
    this.user_id = notification.user_id;
    this.match_user_id = notification.match_user_id;
    this.type = notification.type;
    this.message = notification.message;
    this.link = notification.link;
    this.is_read = notification.is_read;
    this.created_at = notification.created_at;
    this.updated_at = notification.updated_at;
}

async function getForId(id) {
    const data = await sql.query("SELECT * FROM user_notifications LEFT JOIN user ON user_notifications.match_user_id = user.internal_user_id WHERE user_id = ?;",[id]);
    return data[0];
}


export default { Notification, getForId };