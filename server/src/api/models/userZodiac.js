import sql from "../../config/db.js";

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}

const userZodiac = {

    async createCard(internal_user_id, card_type, gender, birth_date, zodiac, animal) {
        birth_date = getFormattedDate(new Date(birth_date))
        gender = gender.toLowerCase()
        gender = gender.charAt(0).toUpperCase() + gender.slice(1);
        const data = await sql.query("INSERT INTO user_zodiac (`id`, `internal_user_id`, `card_type`,`gender`,`birthdate`,`zodiac`,`animal`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?,?, ?, ?, current_timestamp(), current_timestamp());", [
            internal_user_id,
            card_type,
            gender,
            birth_date,
            zodiac,
            animal,
        ])
        return data[0];
    },

    async updateCard(internal_user_id, card_type, gender, birth_date, zodiac, animal) {
        birth_date = getFormattedDate(new Date(birth_date))
        gender = gender.toLowerCase()
        gender = gender.charAt(0).toUpperCase() + gender.slice(1);
        const data = await sql.query("UPDATE user_zodiac SET gender = ? ,birthdate = ? , zodiac = ? , animal = ? WHERE internal_user_id = ? AND card_type = ?", [
            gender,
            birth_date,
            zodiac,
            animal,
            internal_user_id,
            card_type
        ])
        return data[0];
    },

    async deleteCard(id) {
        const data = await sql.query("DELETE FROM user_zodiac WHERE id = ?", [
            id,
        ])
        return data[0];
    },


    async getById(id) {
        const data = await sql.query("SELECT * FROM user_zodiac WHERE id = ?", [
            id,
        ])
        return data[0];
    },

    async getUserZodiac(internal_user_id, card_type) {
        const data = await sql.query("SELECT * FROM user_zodiac WHERE `internal_user_id` = ? AND `card_type` = ?;", [internal_user_id, card_type]);
        return data[0];
    }

}


export default userZodiac;