import sql from "../../config/db.js";

const Assessment = function(assessment) {
    this.content = assessment.content;
}

async function getAllByGroupId(groupId) {
    const data = await sql.query("SELECT content FROM question WHERE group_id = ?;", [groupId]);
    return data[0];
}

export default { Assessment, getAllByGroupId };
