import fs from 'fs';
import path from 'path';
import User from '../models/user.js';
import Result from '../models/result.js';
import Match from '../models/match.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../static/personality_code_definition.json')));
const quadraData = JSON.parse(fs.readFileSync(path.join(dir , '../../../static/quadra_definition.json')));

function getByType(req, res) {
    const personalityData = data[req.params.type];
    res.send({
        ...personalityData,
        quadra_description: quadraData[personalityData.personality_socionic_quadra]
    });
}

async function getByUser(req, res) {
    const result = [];
    const id = req.params.id;
    try {
        const tarcokResult = await Result.getByOldUser(id);//changes
        if (tarcokResult.length > 0) {
            const tarockData = data[tarcokResult[0].tarock_socionics];//changes
            result.push({
                type: 'Tarock',
                data: {
                    resultCode: tarcokResult[0].tarock_socionics,//changes
                    quadra: tarockData.personality_socionic_quadra
                }
            }); 
        }
        const matchData = await Match.query(id);
        result.push({
            type: 'Match',
            data: await Promise.all(matchData.map(async (match) => {
                const matchedUserId = id === match.orig_user_id ? match.matched_user_id : match.orig_user_id;
                const matchedUserData = await User.queryReal(matchedUserId);
                const matchedTarockResult = await Result.getByOldUser(matchedUserId);
                if (matchedTarockResult.length == 0) {
                    throw new Error('No matched user test result!');
                }
                return {
                    matchedUserId: matchedUserId,
                    matchedUserName: matchedUserData[0].name,
                    matchedUserAvatarIndex: matchedUserData[0].avatar_index,
                    matchedUserResultCode: matchedTarockResult[0].tarock_socionics,//changes
                    matchedUserQuadra: data[matchedTarockResult[0].tarock_socionics].personality_socionic_quadra//changes
                };
            }))
        });
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default { getByType, getByUser, dir };
