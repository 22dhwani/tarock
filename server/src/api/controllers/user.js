const User = require('../models/user');

exports.create = (req, res) => {
    const user = new User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex
    });
    User.create(user, (err, data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(400).send(err);
        }
    });
};

exports.query = (req, res) => {
    User.query(req.params.id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    const user = new User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex,
        dob: req.body.dob
    });
    User.update(user, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
};