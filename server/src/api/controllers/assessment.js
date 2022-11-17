import Assessment from "../models/assessment.js";

/**
function getAll (req, res) {
    if (req.query.groupId) {
        Assessment.getAllByGroupId(req.query.groupId, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                console.log(data);
                res.send(data);
            }
        });
    } else {
        res.status(400).json({error_msg: "Group ID is required!"});
    }
};
*/
async function getAll(req, res, next) {
    if (req.query.groupId) {
        try {
            const data = await Assessment.getAllByGroupId(req.query.groupId);
            console.log(data[0]);
            res.send((data[0]));
        } catch (error) {
            res.status(400).send(err);
        }
    } else {
        res.status(400).json({error_msg: "Group ID is required!"});
    }
};

export default { getAll };