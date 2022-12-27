import NotificationModel from "../../models/notification.js";

async function index(req,res){          

    try {
        let data = await NotificationModel.getForId(res.user.internal_user_id);    
        let dataToRead = await NotificationModel.getOnlyUnreadForUser(res.user.internal_user_id)

        const {show_only_unread_count} = req.query
        if(show_only_unread_count){
            res.json(
                {
                    data: dataToRead.length,
                    message: "Notification returned",
                    status: 1,
                }
            );
            return;
        }    

        for await (const notification of dataToRead) {
            await NotificationModel.readNotification(notification.id)
        };

        res.json(
            {
                data: data,
                message: "Notification returned",
                status: 1,
            }
        );
        return
    } catch (error) {
        res.status(422).json(
            {
                error:error.message,
                message:"Something went wrong",
                status: 0,
            }
        );
        return;
    }
    
    
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