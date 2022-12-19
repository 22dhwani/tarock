import sql from "../../config/db.js";

const personalityInsight = function(explore) {
    this.id = explore.id;
    this.code = explore.image;
    this.insight = explore.title;
}

async function getAll() {
    const data = await sql.query("SELECT * FROM personality_insights;");
    return data[0];
}

async function getForCode(code) {
    const data = await sql.query("SELECT * FROM personality_insights WHERE code = ?;",[code]);
    return data[0];
}



export default { personalityInsight,getAll,getForCode };