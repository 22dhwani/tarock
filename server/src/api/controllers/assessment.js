import Assessment from "../models/assessment.js";

async function getAll(req, res) {
    if (req.query.groupId) {
        try {
            const data = await Assessment.getAllByGroupId(req.query.groupId);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        res.status(400).json({error_msg: "Group ID is required!"});
    }
};

export default { getAll };