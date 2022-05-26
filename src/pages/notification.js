import e, { Express } from 'express';
import fetch from 'node-fetch';

const router = Express.Router();
router.post('/sendToAll',(req,res)=>{
var notification = {
    'title': 'Notification Title',
    'text': 'Subtitle'
};
var fcm_tokens = ['dVgLggccRE6pREQWAQfVfN:APA91bFkMmo7vtwKy0j8sQb7xTGKN1yVYI55FuzPNV5kCjtije8aNtZ2svL4Sp5Avo9AseZNSBfIAkJ2fwsJYta2A4pW6YmfvuZvgbp-OH0t67XGAouslJh5wiNBge1HNx6Zs-Pt5Aom'];
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