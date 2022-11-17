import Match from '../models/match.js';

function create(req, res) {
    if (req.body.origUserId === req.body.matchedUserId) {
        res.status(400).send({ err: 'Original user ID and matched user ID cannot be the same.' });
    } else {
        const match = new Match({
            origUserId: req.body.origUserId,
            matchedUserId: req.body.matchedUserId,
        });
        Match.create(match, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    }
};

export default { create };
