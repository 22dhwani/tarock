import User from '../models/user.js';
import crypto from 'crypto';

async function create(req, res) {
    const user = new User.User({
        id: req.body.userId,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatarIndex
    });
    if (req.body.userType === 'REAL') {
        user.email = req.body.email;
        const hash = crypto.createHash('md5').update(user.email).digest("hex");
        user.id = hash;
        try {
            const data = await User.createReal(user);
            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    } else {
        try {
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
            res.send({ userType: 'REAL', id: data[0].internal_user_id });
        }
        const data2 = await User.queryRealId(req.params.id);
        if (data2.length > 0) {
            res.send({ userType: 'REAL', id: data2[0].real_user_id });
        }    
        const data3 = await User.query(req.params.id); 
        if (data3.length > 0) {
            res.send({ userType: 'TMP', id: data3[0].internal_user_id });
        } else {
            res.send({ userType: 'NEW', id: '' });
        }
        
    } catch (error) {
        res.status(400).send(error);
    }
};

async function createTmpIdToRealId (req, res) {
    try {
        const data = await User.createTmpIdToRealId(req.body.tmpId, req.body.realId);
        res.send(data);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default { create, query, update, getUserStatus, createTmpIdToRealId};