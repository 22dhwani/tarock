import NotificationModel from "../../models/notification.js";

async function index(req,res){          
    let data = await NotificationModel.getForId(res.user.internal_user_id);    
    res.json(
        {
            data: data,
            message: "Notification returned",
            status: 1,
        }
    );
    
}

export default { index };