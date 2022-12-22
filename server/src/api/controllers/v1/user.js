import fs from 'fs';
import path from 'path';
import User from '../../models/user.js';
import crypto from 'crypto';
import ApiToken from '../../models/apiToken.js';
import Result from '../../models/result.js';
import Notification from '../../models/notification.js';
import nodemailer from 'nodemailer';
import UserFirebaseModel from '../../models/userFirebase.js';
import UserAvatarModel from '../../models/userAvatar.js';
import https from 'https'
import axios from 'axios';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(dir , '../../../../static/personality_code_definition.json')));

async function getUser(req,res){          
    let user = res.user;
    if(!user){
        res.status(422).json(
            {
                data:user,
                message: "User Not found",
                status: 0,
            }
        );
    }  

    if(req.query.internal_user_id){
        let userData = await User.queryReal(req.query.internal_user_id)
        if(userData.length > 0){
            user = userData[0]
        }
    }

    let userAvatar = await UserAvatarModel.getByUserId(user.internal_user_id)
    user.user_avatar = userAvatar[0] ?? null
    user.question_data = null

    const tarcokResult = await Result.getByUser(user.internal_user_id);
    if (tarcokResult.length > 0) {
        const tarockData = data[tarcokResult[0].result_code];
        user.question_data = {
            resultCode: tarcokResult[0].result_code,
            quadra: tarockData.personality_socionic_quadra
        };
    }

    res.json(
        {
            data: user,
            message: "User returned",
            status: 1,
        }
    );
    
}

async function getUserType(req,res){
    if(!req.query.device_id){
        res.status(422).json(
            {
                message:"device id is required",
                status: 0,
            }
        );
        return
    }
    let tempUser=null;
    let userType = "NEW";
    try {
        const data2 = await User.query(req.query.device_id);
        if (data2.length > 0) {
            tempUser = data2[0]
            if (data2[0].is_permanent_user) {
                userType = "REAL"
            } else {
                userType = "TMP"
            }
        }
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
            user:tempUser,
            data:userType,
            message: "User type returned",
            status: 1,
        }
    );
    
}

async function createTempUser(req,res){
    if(!req.body.name){
        res.status(422).json(
            {
                message:"name is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.device_id){
        res.status(422).json(
            {
                message:"device id is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.avatar_index){
        res.status(422).json(
            {
                message:"avatar index is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.gender){
        res.status(422).json(
            {
                message:"gender is required",
                status: 0,
            }
        );
        return;
    }

    let tempUser=null;
    let existingUser = await User.query(req.body.device_id);    
    if(existingUser.length > 0){
        existingUser[0].id = req.body.device_id;
        existingUser[0].name = req.body.name;
        existingUser[0].gender = req.body.gender;
        existingUser[0].avatarIndex = req.body.avatar_index;
        try {
            await User.update(existingUser[0])
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

        tempUser = await User.query(req.body.device_id);    
        tempUser = tempUser[0]

        let userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
        if(userAvatar.length <= 0){
            await UserAvatarModel.addAvatar(req.body.device_id)
        }
        userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
        let face_index = userAvatar[0].face_index
		let hair_index = userAvatar[0].hair_index
		let eyebrow_index = userAvatar[0].eyebrow_index
		let eye_index = userAvatar[0].eye_index
		let nose_index = userAvatar[0].nose_index
		let whiskers_index = userAvatar[0].whiskers_index
		let beard_index = userAvatar[0].beard_index
		let lips_index = userAvatar[0].lips_index
		let ear_index = userAvatar[0].ear_index
		let glasses_index = userAvatar[0].glasses_indexx

        if(req.body.face_index || req.body.face_index == 0){
            face_index = req.body.face_index
        }
        if(req.body.hair_index || req.body.hair_index == 0){
            hair_index = req.body.hair_index
        }
        if(req.body.eyebrow_index || req.body.eyebrow_index == 0){
            eyebrow_index = req.body.eyebrow_index
        }
        if(req.body.eye_index || req.body.eye_index == 0){
            eye_index = req.body.eye_index
        }
        if(req.body.nose_index || req.body.nose_index == 0){
            nose_index = req.body.nose_index
        }
        if(req.body.whiskers_index || req.body.whiskers_index == 0){
            whiskers_index = req.body.whiskers_index
        }
        if(req.body.beard_index || req.body.beard_index == 0){
            beard_index = req.body.beard_index
        }
        if(req.body.lips_index || req.body.lips_index == 0){
            lips_index = req.body.lips_index
        }
        if(req.body.ear_index || req.body.ear_index == 0){
            ear_index = req.body.ear_index
        }
        if(req.body.glasses_index || req.body.glasses_index == 0){
            glasses_index = req.body.glasses_index
        }
    
        await UserAvatarModel.updateAvatar(userAvatar[0].id,
            face_index,
			hair_index,
			eyebrow_index,
			eye_index,
			nose_index,
			whiskers_index,
			beard_index,
			lips_index,
			ear_index,
			glasses_index
        )
        userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
    
        tempUser.user_avatar = userAvatar[0] ?? null


        res.json(
            {
                user:tempUser,
                message: "Temp user updated",
                status: 1,
            }
        );
        return;
    }
    const user = new User.User({
        id: req.body.device_id,
        name: req.body.name,
        gender: req.body.gender,
        avatarIndex: req.body.avatar_index
    });
    try {
        await User.create(user);

        tempUser = await User.query(req.body.device_id);
        tempUser = tempUser[0];
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

    let userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
    if(userAvatar.length <= 0){
        await UserAvatarModel.addAvatar(req.body.device_id)
    }
    userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
    let face_index = userAvatar[0].face_index
	let hair_index = userAvatar[0].hair_index
	let eyebrow_index = userAvatar[0].eyebrow_index
	let eye_index = userAvatar[0].eye_index
	let nose_index = userAvatar[0].nose_index
	let whiskers_index = userAvatar[0].whiskers_index
	let beard_index = userAvatar[0].beard_index
	let lips_index = userAvatar[0].lips_index
	let ear_index = userAvatar[0].ear_index
	let glasses_index = userAvatar[0].glasses_index


    if(req.body.face_index || req.body.face_index == 0){
        face_index = req.body.face_index
    }
    if(req.body.hair_index || req.body.hair_index == 0){
        hair_index = req.body.hair_index
    }
    if(req.body.eyebrow_index || req.body.eyebrow_index == 0){
        eyebrow_index = req.body.eyebrow_index
    }
    if(req.body.eye_index || req.body.eye_index == 0){
        eye_index = req.body.eye_index
    }
    if(req.body.nose_index || req.body.nose_index == 0){
        nose_index = req.body.nose_index
    }
    if(req.body.whiskers_index || req.body.whiskers_index == 0){
        whiskers_index = req.body.whiskers_index
    }
    if(req.body.beard_index || req.body.beard_index == 0){
        beard_index = req.body.beard_index
    }
    if(req.body.lips_index || req.body.lips_index == 0){
        lips_index = req.body.lips_index
    }
    if(req.body.ear_index || req.body.ear_index == 0){
        ear_index = req.body.ear_index
    }
    if(req.body.glasses_index || req.body.glasses_index == 0){
        glasses_index = req.body.glasses_index
    }

    await UserAvatarModel.updateAvatar(userAvatar[0].id,face_index,hair_index,eye_index,eyebrow_index,ear_index,nose_index,lips_index)
    userAvatar = await UserAvatarModel.getByUserId(req.body.device_id)

    tempUser.user_avatar = userAvatar[0] ?? null
    res.json(
        {
            user:tempUser,
            message: "Temp user created",
            status: 1,
        }
    );
}

async function createRealUser(req,res){
    if(!req.body.email){
        res.status(422).json(
            {
                message:"email is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.password){
        res.status(422).json(
            {
                message:"password is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.device_id){
        res.status(422).json(
            {
                message:"device id is required",
                status: 0,
            }
        );
        return;
    }

    let emailExistUser = await User.findUserByEmail(req.body.email);
    if(emailExistUser.length > 0){
        res.status(422).json(
            {
                message:"User with this Email Already exists, please try another email",
                status: 0,
            }
        );
        return;
    }

    let existingUser = await User.query(req.body.device_id);
    if(existingUser.length <= 0) {
        res.status(422).json(
            {
                message:"Temp User not found",
                status: 0,
            }
        );
        return;
    }

    let hashEmail = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(req.body.email).digest("hex");
    let hashPassword = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(req.body.password).digest('hex');

    let realUser = new User.User({
        id: hashEmail,
        name: existingUser[0].name,
        gender: existingUser[0].gender,
        avatarIndex: existingUser[0].avatar_index,
        email:req.body.email,
        password: hashPassword,
    });
    try {
        const oldResults = await Result.getByUser(req.body.device_id);
        if (oldResults.length > 0) {
          const newResult = new Result.Result({
            userId: hashEmail,
            assessmentGroupId: oldResults[0].question_group_id,
            numOfQuestions: oldResults[0].num_of_questions,
            duration: oldResults[0].duration,
            code: oldResults[0].result_code
          });
          await Result.create(newResult);
        }
        await User.createReal(realUser);
        await User.updateIsPermanentUser(existingUser[0].internal_user_id,1)

        let oldAvatar = await UserAvatarModel.getByUserId(req.body.device_id)
        if(oldAvatar.length > 0){
            let face_index  = oldAvatar[0].face_index
            let hair_index  = oldAvatar[0].hair_index
            let eyebrow_index  = oldAvatar[0].eyebrow_index
            let eye_index  = oldAvatar[0].eye_index
            let nose_index  = oldAvatar[0].nose_index
            let whiskers_index  = oldAvatar[0].whiskers_index
            let beard_index  = oldAvatar[0].beard_index
            let lips_index  = oldAvatar[0].lips_index
            let ear_index  = oldAvatar[0].ear_index
            let glasses_index  = oldAvatar[0].glasses_index
            await UserAvatarModel.addAvatar(
                hashEmail,
                face_index,
                hair_index,
                eyebrow_index,
                eye_index,
                nose_index,
                whiskers_index,
                beard_index,
                lips_index,
                ear_index,
                glasses_index
            )
        }

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
    let data = await User.findUserByEmail(req.body.email);
    let token = await ApiToken.generateToken(data[0].internal_user_id)    

    if(req.body.firebase_id){
        let userFirebase = await UserFirebaseModel.checkExists(data[0].internal_user_id,req.body.firebase_id);
        if(userFirebase.length <= 0){
            await UserFirebaseModel.addToken(data[0].internal_user_id,req.body.firebase_id);
        }
    }

    let userAvatar = await UserAvatarModel.getByUserId(data[0].internal_user_id)
    data[0].user_avatar = userAvatar[0] ?? null
    data[0].question_data = null

    const tarcokResult = await Result.getByUser(data[0].internal_user_id);
    if (tarcokResult.length > 0) {
        const tarockData = data[tarcokResult[0].result_code];
        data[0].question_data = {
            resultCode: tarcokResult[0].result_code,
            quadra: tarockData.personality_socionic_quadra
        };
    }

    res.json(
        {
            token:token,
            data:data[0],
            message: "real user created",
            status: 1,
        }
    );
}

async function login(req,res){
    if(!req.body.email){
        res.status(422).json(
            {
                message:"email is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.password){
        res.status(422).json(
            {
                message:"password is required",
                status: 0,
            }
        );
        return;
    }

    let emailExistUser = await User.findUserByEmail(req.body.email);
    if(emailExistUser.length <= 0) {
        res.status(422).json(
            {
                message:"User with this email not exists",
                status: 0,
            }
        );
        return;
    }

    let hashPassword = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(req.body.password).digest('hex');
    if(emailExistUser[0].password != hashPassword){
        res.status(422).json(
            {
                message:"Incorrect Password",
                status: 0,
            }
        );
        return;
    }
    let token = await ApiToken.generateToken(emailExistUser[0].internal_user_id)    

    if(req.body.firebase_id){
        let userFirebase = await UserFirebaseModel.checkExists(emailExistUser[0].internal_user_id,req.body.firebase_id);
        if(userFirebase.length <= 0){
            await UserFirebaseModel.addToken(emailExistUser[0].internal_user_id,req.body.firebase_id);
        }
    }
    let userAvatar = await UserAvatarModel.getByUserId(emailExistUser[0].internal_user_id)
    emailExistUser[0].user_avatar = userAvatar[0] ?? null

    emailExistUser[0].question_data = null

    const tarcokResult = await Result.getByUser(emailExistUser[0].internal_user_id);
    if (tarcokResult.length > 0) {
        const tarockData = data[tarcokResult[0].result_code];
        emailExistUser[0].question_data = {
            resultCode: tarcokResult[0].result_code,
            quadra: tarockData.personality_socionic_quadra
        };
    }

    res.json(
        {
            token:token,
            data:emailExistUser[0],
            message: "User logged in",
            status: 1,
        }
    );
}

async function logout(req,res){

    let tokenArr = req.headers.authorization.split("Bearer ")

    try {    
        let apiToken = await ApiToken.getByToken(tokenArr[1]);
        if(apiToken.length >= 0){    
            await ApiToken.deleteToken(apiToken[0].id);
        }
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
            message: "User logout",
            status: 1,
        }
    );
}

async function deleteUser(req,res){

    if(!req.body.device_id){
        res.status(422).json(
            {
                message:"device id is required",
                status: 0,
            }
        );
        return;
    }

    let user = res.user
    await ApiToken.deleteAllTokens(user.internal_user_id);
    await User.deleteTmpUser(req.body.device_id);

    // user.


    await User.disableRealUser(user.internal_user_id);
    res.json(
        {
            message: "User Deleted",
            status: 1,
        }
    );
}

async function editUser(req,res){

    let user = res.user
    if(req.body.name){
        user.name = req.body.name
    }
    if(req.body.birth_date){
        user.dob = req.body.birth_date
    }
    if(req.body.gender){
        user.gender = req.body.gender
    }
    if(req.body.avatar_index){
        user.avatarIndex = req.body.avatar_index
    }
    if(req.body.is_notification_on){
        user.is_notification_on = req.body.is_notification_on
    }else{
        user.is_notification_on = 0;
    }
    if(req.body.is_match_card_notification_on){
        user.is_match_card_notification_on = req.body.is_match_card_notification_on
    }else{
        user.is_match_card_notification_on =0;
    }
    if(req.body.is_daily_quest_notification_on){
        user.is_daily_quest_notification_on = req.body.is_daily_quest_notification_on
    }else{
        user.is_daily_quest_notification_on = 0;
    }
    if(req.body.is_new_blog_notification_on){
        user.is_new_blog_notification_on = req.body.is_new_blog_notification_on
    }else{
        user.is_new_blog_notification_on = 0;
    }

    user.id = user.internal_user_id
    await User.updateReal(user);

    let userAvatar = await UserAvatarModel.getByUserId(user.id)
    if(userAvatar.length <= 0){
        await UserAvatarModel.addAvatar(user.id)
    }
    userAvatar = await UserAvatarModel.getByUserId(user.id)
    let face_index = userAvatar[0].face_index
	let hair_index = userAvatar[0].hair_index
	let eyebrow_index = userAvatar[0].eyebrow_index
	let eye_index = userAvatar[0].eye_index
	let nose_index = userAvatar[0].nose_index
	let whiskers_index = userAvatar[0].whiskers_index
	let beard_index = userAvatar[0].beard_index
	let lips_index = userAvatar[0].lips_index
	let ear_index = userAvatar[0].ear_index
	let glasses_index = userAvatar[0].glasses_index

    if(req.body.face_index || req.body.face_index == 0){
        face_index = req.body.face_index
    }
    if(req.body.hair_index || req.body.hair_index == 0){
        hair_index = req.body.hair_index
    }
    if(req.body.eyebrow_index || req.body.eyebrow_index == 0){
        eyebrow_index = req.body.eyebrow_index
    }
    if(req.body.eye_index || req.body.eye_index == 0){
        eye_index = req.body.eye_index
    }
    if(req.body.nose_index || req.body.nose_index == 0){
        nose_index = req.body.nose_index
    }
    if(req.body.whiskers_index || req.body.whiskers_index == 0){
        whiskers_index = req.body.whiskers_index
    }
    if(req.body.beard_index || req.body.beard_index == 0){
        beard_index = req.body.beard_index
    }
    if(req.body.lips_index || req.body.lips_index == 0){
        lips_index = req.body.lips_index
    }
    if(req.body.ear_index || req.body.ear_index == 0){
        ear_index = req.body.ear_index
    }
    if(req.body.glasses_index || req.body.glasses_index == 0){
        glasses_index = req.body.glasses_index
    }

    await UserAvatarModel.updateAvatar(userAvatar[0].id,
        face_index,
		hair_index,
		eyebrow_index,
		eye_index,
		nose_index,
		whiskers_index,
		beard_index,
		lips_index,
		ear_index,
		glasses_index
    )
    userAvatar = await UserAvatarModel.getByUserId(user.id)

    user = await User.findUserByEmail(user.email);
    user[0].user_avatar = userAvatar[0] ?? null
    res.json(
        {
            data:user[0],
            message: "User Updated",
            status: 1,
        }
    );
}

async function forgotPassword(req,res){


    if(!req.body.email){
        res.status(422).json(
            {
                message:"email is required",
                status: 0,
            }
        );
        return;
    }


    const email = req.body.email;

    const id = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(email).digest("hex");

    const realUsers = await User.findUserByEmail(email);
    const sender = {
        email: "account@tarock.me",
        password: "eqlhjrmaxiflsxjs"
    }


    if(realUsers.length <= 0){
        res.status(422).json(
            {
                message:"No user with this email",
                status: 0,
            }
        );
        return;
    }



    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: sender.email,
            pass: sender.password
        }
    });
    const credential = realUsers[0].password;
    const url = process.env['SERVER_BASE_URL'] + `/password/form?id=${id}&credential=${credential}`;
    const mailOptions = {
        from: sender.email,
        to: email,
        subject: 'Your Tarock Password',
        html: `Hello, <b>${realUsers[0].name}</b> <div>Please follow the link to reset your password for ${email}</div> <div>${url}</div>`
    };
    transporter.sendMail(mailOptions);

    res.json(
        {
            message: `An email will be sent to ${email} within 5 mintues, please check your email box.`,
            status: 1,
        }
    );
}

async function contactUs(req,res){
    if(!req.body.email){
        res.status(422).json(
            {
                message:"email is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.content){
        res.status(422).json(
            {
                message:"content is required",
                status: 0,
            }
        );
        return;
    }
    const idToSendMail = 'contact@tarock.me';
    const sender = {
        email: "account@tarock.me",
        password: "eqlhjrmaxiflsxjs"
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: sender.email,
            pass: sender.password
        }
    });

    const mailOptions = {
        from: sender.email,
        to: idToSendMail,
        subject: 'User Contacted from Tarock APP',
        html: `Hello, user with email of <b>${req.body.email}</b> has send a message: <p> ${req.body.content}</p>`
    };
    transporter.sendMail(mailOptions);

    res.json(
        {
            message: `Message sent`,
            status: 1,
        }
    );
}

async function requestData(req,res){
    if(!req.body.email){
        res.status(422).json(
            {
                message:"email is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.password){
        res.status(422).json(
            {
                message:"password is required",
                status: 0,
            }
        );
        return;
    }

    let emailExistUser = await User.findUserByEmail(req.body.email);
    if(emailExistUser.length <= 0) {
        res.status(422).json(
            {
                message:"User with this email not exists",
                status: 0,
            }
        );
        return;
    }

    let hashPassword = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(req.body.password).digest('hex');
    if(emailExistUser[0].password != hashPassword){
        res.status(422).json(
            {
                message:"Incorrect Password",
                status: 0,
            }
        );
        return;
    }
    const idToSendMail = 'contact@tarock.me';

    const sender = {
        email: "account@tarock.me",
        password: "eqlhjrmaxiflsxjs"
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: sender.email,
            pass: sender.password
        }
    });
    const mailOptions = {
        from: sender.email,
        to: idToSendMail,
        subject: 'User Requested data from Tarock APP',
        html: `Hello, user with email of <b>${req.body.email}</b> has requested his data from Tarock app`
    };
    transporter.sendMail(mailOptions);

    res.json(
        {
            message: `Request Sent`,
            status: 1,
        }
    );
}

async function sendForNewBlog(req,res){
    const { link,user_email } = req.query
    if(!link){
        res.status(422).json(
            {
                message:"Link is required",
                status: 0,
            }
        );
        return;
    }
    let sendToAll = true

    if(user_email){
        sendToAll = false
    }


    if(sendToAll){
        let allUsers = await User.getAllUser()
        for await (const user of allUsers) {
            if(user.is_notification_on && user.is_new_blog_notification_on ){
                await Notification.sendToUserId(user.internal_user_id,null,'NEW_BLOG','new Blog Addded, check it out',link,0)
            }
		};
    }else{
        let user = await User.findUserByEmail(user_email)
        if(user.length <= 0){
            res.status(422).json(
                {
                    message:"User with this email not found",
                    status: 0,
                }
            );
            return;
        }
        if(user[0].is_notification_on && user[0].is_new_blog_notification_on ){
            await Notification.sendToUserId(user[0].internal_user_id,null,'NEW_BLOG','new Blog Addded, check it out',link,0)
        }
    }
    res.json(
        {
            message: `Notification sent`,
            status: 1,
        }
    );
}

async function sendForDailyQuestion(req,res){
    const { user_email } = req.query
    let sendToAll = true

    if(user_email){
        sendToAll = false
    }
    if(sendToAll){
        let allUsers = await User.getAllUser()
        for await (const user of allUsers) {
            if(user.is_notification_on && user.is_daily_quest_notification_on ){
                await Notification.sendToUserId(user.internal_user_id,null,'DAILY_QUESTION','Take your daily question now',null,0)
            }
		};
    }else{
        let user = await User.findUserByEmail(user_email)
        if(user.length <= 0){
            res.status(422).json(
                {
                    message:"User with this email not found",
                    status: 0,
                }
            );
            return;
        }
        if(user[0].is_notification_on && user[0].is_daily_quest_notification_on ){
            await Notification.sendToUserId(user[0].internal_user_id,null,'DAILY_QUESTION','Take your daily question now',null,0)
        }
    }
    res.json(
        {
            message: `Notification sent`,
            status: 1,
        }
    );
}

async function socialLogin(req,res){
    let metaData = []
    let finalData = null
    if(!req.body.device_id){
        res.status(422).json(
            {
                message:"device id is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.provider){
        res.status(422).json(
            {
                message:"provider is required",
                status: 0,
            }
        );
        return;
    }
    if(!req.body.token){
        res.status(422).json(
            {
                message:"token is required",
                status: 0,c
            }
        );
        return;
    }
    let device_id = req.body.device_id
    let provider = req.body.provider
    let bearerToken = req.body.token
    let firebase_id = req.body.firebase_id



    try {
        finalData = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?id_token=${bearerToken}`,
        {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
                Accept:'*/*'
            }
        })
    
        let userName = 'User';
        let userEmail = null
        if(finalData.data){
            userName = finalData.data?.name
            userEmail = finalData.data?.email
        }
        if(!userName || !userEmail){
            res.status(422).json(
                {
                    message:"Invalid Token",
                    status: 0,
                }
            );
            return;
        }
        let emailExistUser = await User.findUserByEmail(userEmail);
        if(emailExistUser.length > 0){

            let token = await ApiToken.generateToken(emailExistUser[0].internal_user_id)    

            if(firebase_id){
                let userFirebase = await UserFirebaseModel.checkExists(emailExistUser[0].internal_user_id,firebase_id);
                if(userFirebase.length <= 0){
                    await UserFirebaseModel.addToken(emailExistUser[0].internal_user_id,firebase_id);
                }
            }
            let userAvatar = await UserAvatarModel.getByUserId(emailExistUser[0].internal_user_id)
            emailExistUser[0].user_avatar = userAvatar[0] ?? null


            res.json(
                {
                    token:token,
                    data:emailExistUser[0],
                    message: "User logged in",
                    status: 1,
                }
            );
            return;
        }
        let existingUser = await User.query(device_id);
        if(existingUser.length <= 0) {
            res.status(422).json(
                {
                    message:"Temp User not found",
                    status: 0,
                }
            );
            return;
        }
        let hashEmail = crypto.createHmac('md5', process.env['MD5_SECRET_KEY']).update(userEmail).digest("hex");
        let realUser = new User.User({
            id: hashEmail,
            name: existingUser[0].name,
            gender: existingUser[0].gender,
            avatarIndex: existingUser[0].avatar_index,
            email:userEmail,
        });
        try {
            const oldResults = await Result.getByUser(device_id);
            if (oldResults.length > 0) {
              const newResult = new Result.Result({
                userId: hashEmail,
                assessmentGroupId: oldResults[0].question_group_id,
                numOfQuestions: oldResults[0].num_of_questions,
                duration: oldResults[0].duration,
                code: oldResults[0].result_code
              });
              await Result.create(newResult);
            }
            await User.createReal(realUser);
            await User.updateIsPermanentUser(existingUser[0].internal_user_id,1)
    
            let oldAvatar = await UserAvatarModel.getByUserId(device_id)
            if(oldAvatar.length > 0){
                let face_index  = oldAvatar[0].face_index
                let eye_index  = oldAvatar[0].eye_index
                let eyebrow_index  = oldAvatar[0].eyebrow_index
                let ear_index  = oldAvatar[0].ear_index
                let nose_index  = oldAvatar[0].nose_index
                let lips_index  = oldAvatar[0].lips_index
                let hair_index  = oldAvatar[0].hair_index
                await UserAvatarModel.addAvatar(hashEmail,face_index,hair_index,eye_index,eyebrow_index,ear_index,nose_index,lips_index)
            }
    
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
        let data = await User.findUserByEmail(userEmail);
        let token = await ApiToken.generateToken(data[0].internal_user_id)   
        if(firebase_id){
            let userFirebase = await UserFirebaseModel.checkExists(data[0].internal_user_id,firebase_id);
            if(userFirebase.length <= 0){
                await UserFirebaseModel.addToken(data[0].internal_user_id,firebase_id);
            }
        } 
        let userAvatar = await UserAvatarModel.getByUserId(data[0].internal_user_id)
        data[0].user_avatar = userAvatar[0] ?? null
        
        res.json(
            {
                token:token,
                data:data[0],
                message: "User Logged in",
                status: 1,
            }
        );
        
    } catch (err) {
        res.status(422).json(
            {
                error: err.message,
                message:"Something went wrong",
                status: 0,
            }
        );
        return;
    }

    }

export default { 
    getUser,
    getUserType,
    createTempUser,
    createRealUser,
    login,
    logout ,
    deleteUser,
    editUser,
    forgotPassword,
    requestData,
    contactUs,
    sendForNewBlog,
    sendForDailyQuestion,
    socialLogin,
};
