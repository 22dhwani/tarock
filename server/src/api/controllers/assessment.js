import Assessment from "../models/assessment.js";

async function getAll(req, res) {
    if (req.query.groupId) {
        try {
            const data = await Assessment.getAllByGroupId(req.query.groupId);
            
            console.log(data);
            res.send(data[0]);
        } catch (error) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).json({error_msg: "Group ID is required!"});
    }
};

export default { getAll };