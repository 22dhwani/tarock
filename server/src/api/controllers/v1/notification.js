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

async function readNotification(req,res){
    const { id } = req.params
    await NotificationModel.readNotification(id)
    let notification = await NotificationModel.getById(id)
    if(notification.length <= 0){
        res.status(422).json(
            {
                message:"Notification not found",
                status: 0,
            }
        );
        return;
    }
    
    
    res.json(
        {
            data: notification[0],
            message: "Notification read",
            status: 1,
        }
    );
}

export default { index,readNotification };