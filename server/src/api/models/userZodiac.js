import sql from "../../config/db.js";

const userZodiac = {

    async createCard(internal_user_id,card_type,gender,birth_date,zodiac,animal) {
        const data = await sql.query("INSERT INTO user_zodiac (`id`, `internal_user_id`, `card_type`,`gender`,`birthdate`,`zodiac`,`animal`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?,?, ?, ?, current_timestamp(), current_timestamp());",[
            internal_user_id,
            card_type,
            gender,
            birth_date,
            zodiac,
            animal,
        ])
        return data[0];
    },

    async getUserZodiac(internal_user_id,card_type){
        const data = await sql.query("SELECT * FROM user_zodiac WHERE `internal_user_id` = ? AND `card_type` = ?;",[internal_user_id,card_type]);
        return data[0];
    }
    
}


export default userZodiac;