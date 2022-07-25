import e, { Express } from 'express';
import fetch from 'node-fetch';

const router = Express.Router();
router.post('/sendToAll',(req,res)=>{
var notification = {
    'title': 'Notification Title',
    'text': 'Subtitle'
};
var fcm_tokens = ['c6-rpcGETFOasHl596QH3x:APA91bFAEMaVaiPtIUMx6Xoh2xFXTZrzB48ZbynQ3xm6_-OfauYh_78egtWaPA1HxQLpIjdnIht5t85xS0pzt9iU4UjvxIRjtrX2v6948T3jzC0RKcnomjFIST4jGLDRNzl6DLaF2MBg'];
var notification_body ={
    'notification':notification,
    'registration_ids': fcm_tokens
}
    fetch('https://fcm.googleapis.com/fcm/send',{
        'method':'POST',
        'headers':{
            'Authorization':'key='
            +'AAAAXsbdkuk:APA91bHW3tgIsNoFWwCZYgDLEpLJ8gxLf_t5GgjdEln9w5e_LqkxDP0OWVQT_a0wIMH12Uili0OKsCmmhMrQKIuUXY5zPW1Y9u-pEQehwEkqIsuM3yP15hanE-BorWvCTfJfp8Nasu-H',
            'Content-Type':'application/json'

        },
        'body':JSON.stringify(notification_body)
    }).then(()=>{
        res.status(200).send('Notification Send successfully'); 
    }).catch((err)=>{
        res.status(400).send('CANNOT'); 
        console.log(err);
    }) 
});

module.exports =router