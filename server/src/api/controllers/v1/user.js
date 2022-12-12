import User from '../../models/user.js';
import crypto from 'crypto';
import ApiToken from '../../models/apiToken.js';

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
        await User.createReal(realUser);
        await User.updateIsPermanentUser(existingUser[0].internal_user_id,1)
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

    res.json(
        {
            token:token,
            data:emailExistUser[0],
            message: "Temp user created",
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
    await User.deleteRealUser(user.internal_user_id);
    res.json(
        {
            message: "User Deleted",
            status: 1,
        }
    );
}

export default { getUser,getUserType,createTempUser,createRealUser,login,logout ,deleteUser};
