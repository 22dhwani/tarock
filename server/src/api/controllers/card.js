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
    try {
        const data = await Result.getByUser(req.params.id);
        result.push({
            type: 'Tarock',
            data: data
        }); 
        const data2 = await Match.query(req.params.id);
        result.push({
            type: 'Match',
            data: data2
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error);
    }
}

export default { getByType, getByUser, dir };
