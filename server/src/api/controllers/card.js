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

function getByUser(req, res) {
    const result = [];
    let id = req.params.id;
    // Find tmp user id if exists
    // TODO: optimize this to avoid tmp ID query.
    // TODO: optimize to avoid nested query.
    User.queryTmpId(id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else  {
            if (data.length > 0) {
                id = data[0].tmp_user_id;
            }
            Result.getByUser(id, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    result.push({
                        type: 'Tarock',
                        data: data
                    });
                    Match.query(req.params.id, (err, data) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            result.push({
                                type: 'Match',
                                data: data
                            });
                            res.send(result);
                        }
                    });
                }
            });
        }
    });
}

export default { getByType, getByUser, dir };
