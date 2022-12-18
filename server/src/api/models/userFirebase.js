import sql from "../../config/db.js";

const UserFirebaseModel = {

	async getByUserId(userId) {
		const data = await sql.query("select * FROM user_firebases WHERE user_id = ?;",[userId]);
		return data[0];
	},

	async getByToken(firebaseToken) {
		const data = await sql.query("select * FROM user_firebases WHERE firebase_token = ?;",[firebaseToken]);
		return data[0];
	},

    async checkExists(userId,firebaseToken){
        const data = await sql.query("select * FROM user_firebases WHERE firebase_token = ? AND user_id = ?;",[firebaseToken,userId]);
		return data[0];
    },

    async addToken(userId,firebaseToken){
        const data = await sql.query("INSERT INTO `user_firebases` (`id`, `user_id`, `firebase_token`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, current_timestamp(), current_timestamp())",[userId, firebaseToken]);
		return data[0];
    },

	async removeToken(userId,firebaseToken) {
		const data = await sql.query("DELETE FROM user_firebases WHERE user_id = ? AND firebase_token = ?", [userId, firebaseToken]);
		return data[0];
	}

}

export default UserFirebaseModel 