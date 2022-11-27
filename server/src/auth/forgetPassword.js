import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router()
router.post('/forget/user', async (req, res) => {
    if (req.body.email === undefined) {
        res.status(400).json({
            err_msg: 'Please provide a valid email address.'
        })
    } else {

        const hashEmail = crypto.createHash('md5').update(req.body.email).digest("hex");
        const realUsers = await User.queryReal(hashEmail);

        if (realUsers.length !== 0) {
            forget(req.body.email, realUsers[0].uname, realUsers[0].upwd,req)
            res.status(200).json({msg: 'An email has already been sent to your email address, please look at your email box.'});
        } else {
            res.status(401).json({
                err_msg: 'The user does not exist.'
            })
        }        
    }
});


function forget(email, name, pwd,req) {
    //2. 创建运输对象
    let transporter = nodemailer.createTransport({
        host: 'smtp.qq.com',
        secure: true,
        port: 465,
        auth: {
            user: '', //qq邮箱账号
            pass: '' //邮箱的授权码
        }
    })
    //3.配置发送邮件的信息
    let mailOptions = {
        from: '', // 发送者
        to: email, // 传过来的邮箱
        subject: '忘记密码找回', // 邮件标题
        html: `用户名:<b>${name}</b>，<br>邮箱:<b>${email}</b>，<br>密码:<b>${pwd}</b>，<br>操作ip:<b>${getIp(req)}</b>（我们不会存储您的IP信息，仅作为提示所用。）,<br>请妥善保管您的个人信息!`
    };
    //4.发送邮件
    transporter.sendMail(mailOptions, function (err, data) {
        //回调函数，用于判断邮件是否发送成功
        if (err) {
            console.log('发送异常' + err)
        } else {
            let data = {
                code: 200,
                msg: '验证码发送成功',
            }
            res.send(data)
        }
    })
}
//通过req的hearers来获取客户端ip
var getIp = function (req) {
    var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
    if (ip.split(',').length > 0) {
        ip = ip.split(',')[0];
    }
    return ip;
};
module.exports = router