import fs from 'fs';
import path from 'path';
import User from '../../models/user.js';
import Result from '../../models/result.js';
import Match from '../../models/match.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));

async function getUserCard(req,res){         
    
    let user = res.user;
    if(req.query.user_id){
        user = await User.queryReal(req.query.user_id)
        if(user.length >= 0){
            user = user[0];
        }
    }

    const result = [];
    const id = user.internal_user_id;
    try {
        const tarcokResult = await Result.getByUser(id);
        if (tarcokResult.length > 0) {
            const tarockData = data[tarcokResult[0].result_code];
            result.push({
                type: 'Tarock',
                data: {
                    resultCode: tarcokResult[0].result_code,
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
                const matchedTarockResult = await Result.getByUser(matchedUserId);
                if (matchedTarockResult.length == 0) {
                    throw new Error('No matched user test result!');
                }
                return {
                    matchedUserId: matchedUserId,
                    matchedUserName: matchedUserData[0].name,
                    matchedUserAvatarIndex: matchedUserData[0].avatar_index,
                    matchedUserResultCode: matchedTarockResult[0].result_code,
                    matchedUserQuadra: data[matchedTarockResult[0].result_code].personality_socionic_quadra
                };
            }))
        });
    } catch (error) {
        res.status(422).json(
            {
                error:error.message,
                message:"something went wrong",
                status: 0,
            }
        );
        return
    }


    res.json(
        {
            data: result,
            message: "User Card returned",
            status: 1,
        }
    );
    
}


async function getTypeCard(req,res){          
    let type = req.query.type;
    let finalData = data[type];
    res.json(
        {
            data: finalData,
            message: "Explore returned",
            status: 1,
        }
    );
    
}

export default { getUserCard , getTypeCard};