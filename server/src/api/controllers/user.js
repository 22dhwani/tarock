import User from '../models/user';
import crypto from 'crypto';

function create(req, res) {
    const user = new User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex
    });
    if (req.body.userType === 'REAL') {
        user.email = req.body.email;
        const hash = crypto.createHash('md5').update(user.email).digest("hex");
        user.id = hash;
        User.createReal(user, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(user);
            }
        });
    } else {
        User.create(user, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(user);
            }
        });
    }
};

function query(req, res) {
    if (req.query.userType === 'REAL') {
        User.queryReal(req.params.id, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        User.query(req.params.id, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    }
};

function update(req, res) {
    const user = new User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex,
        dob: req.body.dob
    });
    if (req.body.userType === 'REAL') {
        User.updateReal(user, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    } else {
        User.update(user, (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(data);
            }
        });
    }
};

function getUserStatus (req, res) {
    User.queryReal(req.params.id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else if (data.length > 0) {
            res.send({ userType: 'REAL', id: data[0].internal_user_id });
        } else {
            User.queryRealId(req.params.id, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                } else if (data.length > 0) {
                    res.send({ userType: 'REAL', id: data[0].real_user_id });
                } else {
                    User.query(req.params.id, (err, data) => {
                        if (err) {
                            res.status(400).send(err);
                        } else if (data.length > 0) {
                            res.send({ userType: 'TMP', id: data[0].internal_user_id });
                        } else {
                            res.send({ userType: 'NEW', id: '' });
                        }
                    });
                }
            });
        }
    });
};

function createTmpIdToRealId (req, res) {
    User.createTmpIdToRealId(req.body.tmpId, req.body.realId, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
}

export default { create, query, update, getUserStatus, createTmpIdToRealId};