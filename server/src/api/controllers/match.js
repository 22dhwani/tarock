const Match = require('../models/match');

exports.create = (req, res) => {
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
};
