import Match from '../models/match.js';

async function create(req, res) {
    if (req.body.origUserId === req.body.matchedUserId) {
        res.status(400).send({ err: 'Original user ID and matched user ID cannot be the same.' });
    } else {
        const match = new Match.Match({
            origUserId: req.body.origUserId,
            matchedUserId: req.body.matchedUserId,
        });

        try {
            const data = await Match.create(match);
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

export default { create };
