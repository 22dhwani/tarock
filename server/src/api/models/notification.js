import sql from "../../config/db.js";
import UserFirebaseModel from "./userFirebase.js";
import User from "./user.js";
import axios from 'axios';

const Notification = function(notification) {
    this.id = notification.id;
    this.user_id = notification.user_id;
    this.match_user_id = notification.match_user_id;
    this.type = notification.type;
    this.message = notification.message;
    this.link = notification.link;
    this.is_read = notification.is_read;
    this.created_at = notification.created_at;
    this.updated_at = notification.updated_at;
}

async function getForId(id) {
    const data = await sql.query("SELECT user_notifications.*,user.name,user.avatar_index,user_avatars.face_index,user_avatars.hair_index,user_avatars.eyebrow_index,user_avatars.eye_index,user_avatars.nose_index,user_avatars.whiskers_index,user_avatars.beard_index,user_avatars.lips_index,user_avatars.ear_index,user_avatars.glasses_index FROM user_notifications LEFT JOIN user ON user_notifications.match_user_id = user.internal_user_id LEFT JOIN user_avatars ON user.internal_user_id = user_avatars.internal_user_id WHERE user_id = ? ORDER BY created_at DESC;",[id]);
    return data[0];
}

async function getById(id) {
    const data = await sql.query("SELECT * FROM user_notifications WHERE id = ?;",[id]);
    return data[0];
}

async function getOnlyUnreadForUser(id) {
    const data = await sql.query("SELECT * FROM user_notifications WHERE is_read = 0 AND user_id = ?;",[id]);
    return data[0];
}

async function sendNotificationToFirebaseIds(firebaseIds,title,message,clickAction=null,type=null,data=null){
    await axios.post('https://fcm.googleapis.com/fcm/send',
    {
        "registration_ids":firebaseIds,
        "notification":{
            "title":title,
            "body":message,
            "clickAction":"FLUTTER_NOTIFICATION_CLICK",
            "channelId":"high_importance_channel"
        },
        "android":{
            "ttl":"86400s",
            "notification":{
              "click_action":clickAction
            }
        },
        "apns": {
            "headers": {
              "apns-priority": "5",
            },
            "payload": {
              "aps": {
                "category": clickAction
              }
            }
        },
        "webpush":{
            "headers":{
              "TTL":"86400"
            }
        }
    },
    {
        headers: {
          Authorization: 'key=AAAAWa_L9Tw:APA91bHKphzqIegwALkPYWaiuQIG-pXXh1OS7bMw7j92oiXxGkPfCqKcAegU-VwrMI98Tu6_-ZaVtP25ADOiri1OFXKPbLbh9O0cRIiHDNHPdGiddfd-AZen4x3W90fprYp79ru1KKwM'
        }
    })

}

async function sendToUserId(id,match_user_id=null,type=null,message=null,link=null,is_read=null,blog_id = null) {

    let tokens = await UserFirebaseModel.getByUserId(id)
    tokens = tokens.map((token)=>{
        return token.firebase_token
    })
    let title = message
    let dbMessage = message
    if (type === 'DAILY_QUESTION') {
        title = 'Daily Tarock Discovery'
    } else if (type === 'NEW_BLOG') {
        title = 'Tarock posted a new blog!'
    }else if(type === 'MATCH_CARD'){
        if(match_user_id){
            let anotherUser = await User.queryReal(match_user_id)
            anotherUser=anotherUser[0]
            message = message+' '+anotherUser.name
        }
    }
    if(tokens.length > 0){
        await sendNotificationToFirebaseIds(tokens,title,message)
    }
    let notiData =null
    if(blog_id){}
    notiData = {
        blog_id:blog_id,
        match_user_id:match_user_id
    }
    const data = await sql.query("INSERT INTO user_notifications (`id`, `user_id`, `match_user_id`, `type`, `message`, `link`, `is_read`,`data`, `created_at`, `updated_at`) VALUES (NULL, ?, ?, ?, ?, ?, ?,?, current_timestamp(), current_timestamp())",[
        id,
        match_user_id,
        type,
        dbMessage,
        link,
        is_read,
        JSON.stringify(notiData) 
    ]);
    return data[0];
}

async function readNotification(id){
    const data = await sql.query("UPDATE user_notifications SET is_read = 1 WHERE id = ?",[id]);
    return data[0];
}


export default { Notification, getForId ,sendToUserId,getById,readNotification,getOnlyUnreadForUser};