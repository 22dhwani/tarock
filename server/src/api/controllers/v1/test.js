import User from '../../models/user.js';
import ApiToken from '../../models/apiToken.js';

async function test(req,res){            
    if(req.headers.authorization){        
        res.json(
            {
                data: res.user,
            }
        );
    }
    
}

async function getToken(req,res){
    let user = null;
    let token = null;
    if(req.query.user_id){
        const data = await User.queryReal(req.query.user_id);
        if(data.length > 0){
            user = data[0]
        }
    }
    if(user){
        token = await ApiToken.generateToken(user.internal_user_id)    
    }
    
    res.json(
        {
            token:token,
            data:user,
            message:"User returned",
            status: 1,
        }
    );
}

export default { test, getToken };
