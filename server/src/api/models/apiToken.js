import sql from "../../config/db.js";
import User from "./user.js";

const ApiToken = function(apiToken) {
    this.id = apiToken.id;
    this.user_id = apiToken.user_id;
    this.name = apiToken.name;
    this.type = apiToken.type;
    this.token = apiToken.token;
    this.expires_at = apiToken.expires_at;
    this.created_at = apiToken.created_at;
}

async function create(apiToken) {
    const data = await sql.query("INSERT INTO api_tokens (user_id, name, type, token,expires_at) VALUES (?, ?, ?, ?, ?);", [apiToken.user_id, apiToken.name, apiToken.type, apiToken.token,apiToken.expires_at]);
    return data[0];
}

async function getByToken(token) {
    const data = await sql.query("SELECT * FROM api_tokens WHERE token = ?;", [token]);
    return data[0];
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *charactersLength));
    }
    return result;
}

async function generateToken(userId) {

    let generatedToken = makeid(32);
    let existingToken = [];
    do {
        generatedToken = makeid(32);
        existingToken= await getByToken(generatedToken)
    } while (existingToken.length > 0);

    const apiToken = new ApiToken({
        user_id: userId,
        name:"Bearer token",
        type:"api",
        token:generatedToken,
    });
    const data = await sql.query("INSERT INTO api_tokens (user_id, name, type, token,expires_at) VALUES (?, ?, ?, ?, ?);", [apiToken.user_id, apiToken.name, apiToken.type, apiToken.token,apiToken.expires_at]);
    return generatedToken;
}

async function getUserByBearerToken(bearerToken) {
    let tokenArr = bearerToken.split("Bearer ")
    if(tokenArr.length != 2){
        throw new Error(`Invalid Bearer Token`);
    }
    let apiToken = await getByToken(tokenArr[1]);

    if(apiToken.length <= 0){
        throw new Error(`Token not exists`);
    }
    let user = await User.getById(apiToken[0].user_id);
    if(user.length <= 0){
        throw new Error(`User not found`);
    }
    return user[0]    
}


export default { ApiToken, create ,getByToken, generateToken,getUserByBearerToken };