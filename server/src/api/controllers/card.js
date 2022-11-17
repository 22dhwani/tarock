import fs from 'fs';
import path from 'path';
import User from '../models/user.js';
import Result from '../models/result.js';
import Match from '../models/match.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../static/personality_code_definition.json')));

function getByType(req, res) {
    res.send(data[req.params.type]);
}

async function getByUser(req, res) {
    const result = [];
    let id = req.params.id;
    // Find tmp user id if exists
    // TODO: optimize this to avoid tmp ID query.
    // TODO: optimize to avoid nested query.

    try {
        const data = await User.queryTmpId(id);
        if (data.length > 0) {
            id = data[0].tmp_user_id;
        }
        const data2 = await Result.getByUser(id);
        result.push({
            type: 'Tarock',
            data: data2
        }); 
        const data3 = await Match.query(req.params.id);
        result.push({
            type: 'Match',
            data: data3
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default { getByType, getByUser, dir };
