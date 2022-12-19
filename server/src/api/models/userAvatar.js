import sql from "../../config/db.js";

const UserAvatarModel = {

	async getByUserId(userId) {
		const data = await sql.query("select * FROM user_avatars WHERE internal_user_id = ?;",[userId]);
		return data[0];
	},

    async checkExists(userId){
        const data = await sql.query("select * FROM user_avatars WHERE internal_user_id = ?;",[userId]);
		return data[0];
    },

    async addAvatar(userId,face_index,hair_index,eye_index,eyebrow_index,ear_index,nose_index,lips_index){
        const data = await sql.query("INSERT INTO `user_avatars` (`id`, `internal_user_id`, `face_index`, `hair_index`, `eye_index`, `eyebrow_index`, `ear_index`, `nose_index`, `lips_index`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?);",[userId,face_index,hair_index,eye_index,eyebrow_index,ear_index,nose_index,lips_index])
		return data[0];
    },

	async updateAvatar(avatarId,face_index = null,hair_index= null,eye_index= null,eyebrow_index= null,ear_index= null,nose_index= null,lips_index= null) {
        const data = await sql.query("UPDATE user_avatars SET face_index = ?, hair_index = ?,eye_index = ?,eyebrow_index = ?,ear_index = ?,nose_index = ?,lips_index = ? WHERE id = ?",[face_index,hair_index,eye_index,eyebrow_index,ear_index,nose_index,lips_index,avatarId])
		return data[0];
	}

}

export default UserAvatarModel 