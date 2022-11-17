import {conp as sql} from "../../config/db.js";

const Assessment = function(assessment) {
    this.content = assessment.content;
}


async function getAllByGroupId(groupId) {
    const data = await sql.query("SELECT content FROM question WHERE group_id = ?;", [groupId]);
    return data;
}


/**
async function getAllByGroupId(groupId, cb) {
    sql.query("SELECT content FROM question WHERE group_id = ?;", [groupId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            cb(err, null);
            return;
        }
        cb(null, res);
    });
}
*/
export default { Assessment, getAllByGroupId };
