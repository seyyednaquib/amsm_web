import React,{ useEffect, useState } from "react";
import axios from 'axios'
import { uid } from "uid";
import { auth, db ,storage} from "../firebase";
import { getStorage ,ref as ref_storage,uploadBytes,getDownloadURL } from "@firebase/storage";
import  { set,ref , onValue, remove, update,  } from "firebase/database";

import {  useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Container, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Radio ,RadioGroup} from "@mui/material";
import Services from "./services";
export default function AddLocalStore(){
    const navigate= useNavigate();
    const [imageUpload,setImageUpload] = useState(null);
    const [imageUrl,setImageUrl] =useState('');
    const [addingInput,setaddingInput] =useState({
        title:'',
        content:'',
        image:''
    });
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(!user){
              navigate('/');
            }
        });
    },[]);
    const addLocalStore = (e)=>{
        e.preventDefault();
        if(addingInput.title === ''){
            alert('Please Input Local Store Name')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Local Store Description')
            return
        }
        const uidd= uid();
       var tempimage ='https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg?w=2000';
       var today = new Date(),
    time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' +today.getHours() + ':' + today.getMinutes() ;
       if(imageUpload!=null){
        const storage = getStorage();
        const imageRef= ref_storage(storage,'announcements/'+imageUpload.name+uidd);
        uploadBytes(imageRef,imageUpload).then(()=> {
           getDownloadURL(imageRef).then((url)=>{
            console.log(url);
            set(ref(db,"/announcements/"+uidd ), {
             title: addingInput.title,
           serviceid: uidd,
           content: addingInput.content,
           ImgUrl: url,
           dateCreated: time
       })
            });
        }) 
       }else{
        set(ref(db,"/announcements/"+uidd ), {
            title: addingInput.title,
          serviceid: uidd,
          content: addingInput.content,
          ImgUrl: tempimage,
          dateCreated: time
      })
       }
       var data = JSON.stringify({
        "to": "dVgLggccRE6pREQWAQfVfN:APA91bFkMmo7vtwKy0j8sQb7xTGKN1yVYI55FuzPNV5kCjtije8aNtZ2svL4Sp5Avo9AseZNSBfIAkJ2fwsJYta2A4pW6YmfvuZvgbp-OH0t67XGAouslJh5wiNBge1HNx6Zs-Pt5Aom",
        "notification": {
          "body": addingInput.content,
          "title": addingInput.title
        },
        "data": {
          "route": "announcement"
        }
      });
     
     var config = {
       method: 'post',
       url: 'https://fcm.googleapis.com/fcm/send',
       headers: { 
         'Content-Type': 'application/json', 
         'Authorization': 'key=AAAAXsbdkuk:APA91bHW3tgIsNoFWwCZYgDLEpLJ8gxLf_t5GgjdEln9w5e_LqkxDP0OWVQT_a0wIMH12Uili0OKsCmmhMrQKIuUXY5zPW1Y9u-pEQehwEkqIsuM3yP15hanE-BorWvCTfJfp8Nasu-H'
       },
       data : data
     };
     
     axios(config)
     .then(function (response) {
       console.log(JSON.stringify(response.data));
     })
     .catch(function (error) {
       console.log(error);
     });

        setaddingInput('');
        navigate('/addService')
    };

    return(
        <Container>
        <Typography 
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
        >
            New Announcement
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addLocalStore}>
            <TextField 
               onChange={(e)=> setaddingInput({...addingInput,title:e.target.value})}
                variant="outlined"   
                label="Announcement Title"
                color="secondary"
                fullWidth
                required
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
               <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
            
            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,content:e.target.value})}
                variant="outlined"   
                label="Announcement Content"
                color="secondary"
                fullWidth
                required
                multiline
                rows={4}
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
             <Button 
            type='submit'
            color='primary'
            variant="contained"
            startIcon={<SendIcon/>}
            sx={{marginBottom:2}}
            >
            Submit  
            </Button>
        </form>
      
       
        </Container>)
}

 