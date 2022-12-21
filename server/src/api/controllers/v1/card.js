import fs from 'fs';
import path from 'path';
import User from '../../models/user.js';
import Result from '../../models/result.js';
import Match from '../../models/match.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import userZodiac from '../../models/userZodiac.js';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));
const zodiacData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/zodiac_card_data.json')));

async function getUserCard(req,res){         
    
    const result = [];
    let user = res.user;
    try{        
        if(req.query.user_id){
            let userList = await User.queryReal(req.query.user_id)
            if(userList.length >= 0){
                user = userList[0];
            }
        }
    
        const id = user.internal_user_id;
        try {
            const tarcokResult = await Result.getByUser(id);
            if (tarcokResult.length > 0) {
                const tarockData = data[tarcokResult[0].result_code];
                result.push({
                    type: 'Tarock',
                    data: [
                        {
                            resultCode: tarcokResult[0].result_code,
                            quadra: tarockData.personality_socionic_quadra
                        }                        
                    ]
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
    }catch(error){
        res.status(422).json(
            {
                error:error.message,
                message:"something went wrong",
                status: 0,
            }
        );
        return
    }

    if(result.length >= 0){
        if(result[0].type == "Tarock"){
            let zodiac = await userZodiac.getUserZodiac(user.internal_user_id,'ZODIAC')
            if(zodiac.length > 0){
                result[0].data.push({
                    card_type:zodiac[0].card_type,
                    data:zodiac[0].zodiac
                })
            }
            
        }
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
    let {type,zodiac,animal} = req.query
    let finalData = null
    if(type){
        finalData = data[type];
    }
    if(zodiac){
        finalData = zodiacData[zodiac];
    }
    
    res.json(
        {
            data: finalData,
            message: "Explore returned",
            status: 1,
        }
    );
    
}

async function addCard(req,res) {
    const { birth_date, gender,card_type } = req.body
    let user = res.user
    if(!birth_date){
        res.status(422).json(
            {
                message:"birthdate is required",
                status: 0,
            }
        );
    }
    if(!gender){
        res.status(422).json(
            {
                message:"gender is required",
                status: 0,
            }
        );
    }

    if(!card_type){
        res.status(422).json(
            {
                message:"card type is required",
                status: 0,
            }
        );
    }

    if(card_type == "ZODIAC"){
        let date_map = [
            {
                'start_date':'01-20',
                'end_date':'02-18',
                'zodiac':'Aquarius'
            },
            {
                'start_date':'02-19',
                'end_date':'03-20',
                'zodiac':'PISCES'
            },
            {
                'start_date':'03-21',
                'end_date':'04-19',
                'zodiac':'ARIES'
            },
            {
                'start_date':'04-20',
                'end_date':'05-20',
                'zodiac':'TAURUS'
            },
            {
                'start_date':'05-21',
                'end_date':'06-20',
                'zodiac':'GEMINI'
            },
            {
                'start_date':'06-21',
                'end_date':'07-22',
                'zodiac':'CANCER'
            },
            {
                'start_date':'07-23',
                'end_date':'08-22',
                'zodiac':'LEO'
            },
            {
                'start_date':'08-23',
                'end_date':'09-22',
                'zodiac':'VIRGO'
            },
            {
                'start_date':'09-23',
                'end_date':'10-22',
                'zodiac':'LIBRA'
            },
            {
                'start_date':'10-23',
                'end_date':'11-21',
                'zodiac':'SCORPIO'
            },
            {
                'start_date':'11-22',
                'end_date':'12-21',
                'zodiac':'SAGITTARIUS'
            },
            {
                'start_date':'12-22',
                'end_date':'01-19',
                'zodiac':'CAPRICORN'
            },
            
        ]    
        
        let check_month = birth_date.split("-")[1]
        let check_date = birth_date.split("-")[2]
    
        let small_map = date_map.filter(date => date.start_date.split("-")[0] == check_month || date.end_date.split("-")[0] == check_month)
    
    
        let zodiac_birth_date = new Date(birth_date)
        let zodiac_birth_year = zodiac_birth_date.getFullYear()
        small_map = small_map.filter((date)=>{
            if(check_month == 1 && check_date >= 1 && check_date <= 19){
                let start_date = null
                if(date.start_date.split('-')[0] == 12){
                    start_date = new Date((zodiac_birth_year-1)+'-'+date.start_date)    
                }else{
                    start_date = new Date((zodiac_birth_year)+'-'+date.start_date)    
                }
                let end_date = new Date(zodiac_birth_year+'-'+date.end_date)
                if(zodiac_birth_date >= start_date && zodiac_birth_date <= end_date){
                    return true
                }
                return false    
            }else{
                let start_date = new Date(zodiac_birth_year+'-'+date.start_date)
                let end_date = new Date(zodiac_birth_year+'-'+date.end_date)
                if(zodiac_birth_date >= start_date && zodiac_birth_date <= end_date){
                    return true
                }
                return false
            }
    
            
        })
        if(small_map.length <= 0){
            res.status(422).json(
                {
                    message:"zodiac Not found for selected date",
                    status: 0,
                }
            );
            return
        }
    
        let selected_zodiac = small_map[0].zodiac
        await userZodiac.createCard(user.internal_user_id,card_type,gender,birth_date,selected_zodiac,null)
    }else{

    }

    
    res.json(
        {
            message: "Card added",
            status: 1,
        }
    );
}

export default { getUserCard , getTypeCard, addCard};