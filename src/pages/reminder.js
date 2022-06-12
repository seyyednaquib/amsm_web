import React, { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

export const Reminder = () => {
    const sendEmail = (e) => {
        // e.preventDefault();
        var templateParams = {
            subject: 'REMINDER - UPDATE COMPLAINT STATUS AMSM ',
            to_name: 'Management',
            message: 'Please Update complaint ID from ASAP'
        };
        var templateParamsBookedService = {
            subject: 'REMINDER - UPDATE BOOKED SERVICE STATUS AMSM ',
            to_name: 'Management',
            message: 'Please Update complaint ID from ASAP'
        };
        emailjs.send('service_3tsd4e6', 'template_go3e74l', templateParams, '36jiqkJybnTOSl6Cg');
        emailjs.send('service_3tsd4e6', 'template_go3e74l', templateParamsBookedService, '36jiqkJybnTOSl6Cg');
        // emailjs.sendForm('service_3tsd4e6', 'template_go3e74l', form, '36jiqkJybnTOSl6Cg')
        //   .then((result) => {
        //       console.log(result.text);
        //   }, (error) => {
        //       console.log(error.text);
        //   });
      };

    useEffect(()=>{
        sendEmail();
    },[]);
  const form = useRef();




  return (

    <div on>Mail sended</div>
  );
};