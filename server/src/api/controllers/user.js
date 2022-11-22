import User from '../models/user.js';
import crypto from 'crypto';
import user from '../routers/user.js';

async function create(req, res) {
    const user = new User.User({
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex
    });
    if (req.body.userType === 'REAL') {
        try {
            user.id = crypto.createHash('md5').update(user.email).digest("hex");
            user.email = req.body.email;
            user.password = null;

            const data = await User.createReal(user);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        try {
            user.id = req.body.userId;
            const data = await User.create(user);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

async function query(req, res) {
    if (req.query.userType === 'REAL') {
        try {
            const data = await User.queryReal(req.params.id);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        try {
            const data = await User.query(req.params.id);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

async function update(req, res) {
    const user = new User.User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex,
        dob: req.body.dob
    });
    if (req.body.userType === 'REAL') {
        try {
            user.password = req.body.password;
            const data = await User.updateReal(user);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        try {
            const data = await User.update(user);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
};

async function getUserStatus (req, res) {
    try {
        const data = await User.queryReal(req.params.id);
        if (data.length > 0) {
            res.send({ userType: 'REAL' });
        } else {
            const data2 = await User.query(req.params.id);
            if (data2.length > 0) {
                if (data2[0].is_permanent_user) {
                    res.send({ userType: 'REAL' });
                } else {
                    res.send({ userType: 'TMP' });
                }
            } else {   
                res.send({ userType: 'NEW' });
            }
        } 
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
async function createTmpIdToRealId (req, res) {
    try {
        const data = await User.createTmpIdToRealId(req.body.tmpId, req.body.realId);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}
*/

async function updateIsPermanentUser(req, res) {
    try {
        const data = await User.updateIsPermanentUser(req.body.id, req.body.isPermanentUser);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default { create, query, update, getUserStatus, updateIsPermanentUser};
