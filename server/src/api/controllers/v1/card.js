import fs from 'fs';
import path from 'path';
import User from '../../models/user.js';
import Result from '../../models/result.js';
import Match from '../../models/match.js';
import UserRateModel from '../../models/userRates.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import userZodiac from '../../models/userZodiac.js';
import UserAvatarModel from '../../models/userAvatar.js';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));
const zodiacData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/zodiac_card_data.json')));
const animalData = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/chinese_zodiac_card_data.json')));

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
                            id:null,
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
                    const macthUserAvatar = await UserAvatarModel.getByUserId(matchedUserId)
                    if(macthUserAvatar.length > 0){
                        return {
                            id:match.id,
                            matchedUserId: matchedUserId,
                            matchedUserName: matchedUserData[0].name,
                            matchedUserAvatarIndex: matchedUserData[0].avatar_index,
    
                            matched_user_face_index: macthUserAvatar[0].face_index,
                            matched_user_hair_index: macthUserAvatar[0].hair_index,
                            matched_user_eyebrow_index: macthUserAvatar[0].eyebrow_index,
                            matched_user_eye_index: macthUserAvatar[0].eye_index,
                            matched_user_nose_index: macthUserAvatar[0].nose_index,
                            matched_user_whiskers_index: macthUserAvatar[0].whiskers_index,
                            matched_user_beard_index: macthUserAvatar[0].beard_index,
                            matched_user_lips_index: macthUserAvatar[0].lips_index,
                            matched_user_ear_index: macthUserAvatar[0].ear_index,
                            matched_user_glasses_index: macthUserAvatar[0].glasses_index,
    
                            matchedUserResultCode: matchedTarockResult[0].result_code,
                            matchedUserQuadra: data[matchedTarockResult[0].result_code].personality_socionic_quadra
                        };    
                    }else{
                        return {
                            id:match.id,
                            matchedUserId: matchedUserId,
                            matchedUserName: matchedUserData[0].name,
                            matchedUserAvatarIndex: matchedUserData[0].avatar_index,
    
                            matched_user_face_index: null,
                            matched_user_hair_index: null,
                            matched_user_eyebrow_index: null,
                            matched_user_eye_index: null,
                            matched_user_nose_index: null,
                            matched_user_whiskers_index: null,
                            matched_user_beard_index: null,
                            matched_user_lips_index: null,
                            matched_user_ear_index: null,
                            matched_user_glasses_index: null,
    
                            matchedUserResultCode: matchedTarockResult[0].result_code,
                            matchedUserQuadra: data[matchedTarockResult[0].result_code].personality_socionic_quadra
                        };
                    }
                   
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
                    id:zodiac[0].id,
                    resultCode:zodiac[0].card_type,
                    quadra:zodiac[0].zodiac
                })
            }
            let animal = await userZodiac.getUserZodiac(user.internal_user_id,'CHINESE_ZODIAC')
            if(animal.length > 0){
                result[0].data.push({
                    id:animal[0].id,
                    resultCode:animal[0].card_type,
                    quadra:animal[0].animal
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
    let {type,zodiac,animal,owner_id} = req.query
    let finalData = null
    if(type){
        finalData = data[type];
    }
    if(zodiac){
        finalData = zodiacData[zodiac];
    }
    if(animal){
        finalData = animalData[animal];
    }
    let isRated = false;
    if(owner_id){
        let userRate = await UserRateModel.findByIds(owner_id,res.user.internal_user_id)
        if(userRate.length > 0){
            isRated = true
        }
        
    }
    
    res.json(
        {
            is_rated:isRated,
            data:finalData,
            message: "Explore returned",
            status: 1,
        }
    );
    
}
async function deleteCard(req,res){
    const { card_id ,type} = req.body
    if(!card_id){
        res.status(422).json(
            {
                message:"card id is required",
                status: 0,
            }
        );
        return
    }
    if(!type){
        res.status(422).json(
            {
                message:"type is required",
                status: 0,
            }
        );
        return
    }
    if(type=='TAROCK'){
        await userZodiac.deleteCard(card_id)
    }else{
        await Match.deleteId(card_id)
    }
    
    res.json(
        {
            message: "Card deleted",
            status: 1,
        }
    );
}

async function addCard(req,res) {
    const { birth_date, gender,card_type,birth_year } = req.body
    let user = res.user
    
    if(!gender){
        res.status(422).json(
            {
                message:"gender is required",
                status: 0,
            }
        );
        return
    }

    if(!card_type){
        res.status(422).json(
            {
                message:"card type is required",
                status: 0,
            }
        );
        return
    }

    let data = null
    try {
        if(card_type == "ZODIAC"){
            if(!birth_date){
                res.status(422).json(
                    {
                        message:"birthdate is required",
                        status: 0,
                    }
                );
                return
            }
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
                    if(check_month == 12 && check_date >= 22 && check_date <= 31){
                        let start_date = null
                        let end_date = null
                        if(date.start_date.split('-')[0] == 12){
                            start_date = new Date((zodiac_birth_year)+'-'+date.start_date)    
                            end_date = new Date((zodiac_birth_year+1)+'-'+date.end_date)
                        }else{
                            start_date = new Date((zodiac_birth_year)+'-'+date.start_date)    
                            end_date = new Date((zodiac_birth_year)+'-'+date.end_date)
                        }                    
                        if(zodiac_birth_date >= start_date && zodiac_birth_date <= end_date){
                            return true
                        }
                        return false
                    }else{
                        let start_date = new Date(zodiac_birth_year+'-'+date.start_date)
                        let end_date = new Date(zodiac_birth_year+'-'+date.end_date)
                        console.log(start_date,end_date,zodiac_birth_date);
                        if(zodiac_birth_date >= start_date && zodiac_birth_date <= end_date){
                            return true
                        }
                        return false
    
                    }
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
            data = await userZodiac.createCard(user.internal_user_id,card_type,gender,birth_date,selected_zodiac,null)
            data = await userZodiac.getById(data.insertId)
        }else{
    
            if(!birth_year){
                res.status(422).json(
                    {
                        message:"Birth Year is required",
                        status: 0,
                    }
                );
                return
            }
    
            let year_map = [
                {
                    'years':[
                        1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020
                    ],
                    'animal':'Rat',
                },
                {
                    'years':[
                        1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021
                    ],
                    'animal':'Ox',
                },
                {
                    'years':[
                        1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022
                    ],
                    'animal':'Tiger',
                },
                {
                    'years':[
                        1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023
                    ],
                    'animal':'Rabbit',
                },
                {
                    'years':[
                        1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024
                    ],
                    'animal':'Dragon',
                },
                {
                    'years':[
                        1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025
                    ],
                    'animal':'Snake',
                },
                {
                    'years':[
                        1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026
                    ],
                    'animal':'Horse',
                },
                {
                    'years':[
                        1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027
                    ],
                    'animal':'Goat',
                },
                {
                    'years':[
                        1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028
                    ],
                    'animal':'Monkey',
                },
                {
                    'years':[
                        1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029
                    ],
                    'animal':'Rooster',
                },
                {
                    'years':[
                        1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031
                    ],
                    'animal':'Pig',
                },
            ]
    
    
            let final_map = year_map.filter((data)=>{
                if(data.years.includes(parseInt(birth_year))){
                    return true
                }
                return false
            })
    
            if(final_map.length <= 0){
                res.status(422).json(
                    {
                        message:"animal Not found for selected year",
                        status: 0,
                    }
                );
                return
            }
    
            let selected_animal = final_map[0].animal
            data = await userZodiac.createCard(user.internal_user_id,card_type,gender,birth_year,null,selected_animal)
            data = await userZodiac.getById(data.insertId)
        }
    
    } catch (error) {
        res.status(422).json(
            {
                error:error.message,
                message:"Something went wrong",
                status: 0,
            }
        );
        return
    }

    res.json(
        {
            data:{
                id:data[0].id,
                resultCode:data[0].card_type,
                quadra:data[0].card_type == 'ZODIAC' ? data[0].zodiac : data[0].animal
            },
            message: "Card added",
            status: 1,
        }
    );
}

export default { getUserCard , getTypeCard, addCard,deleteCard};