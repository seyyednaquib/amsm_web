import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";
import { auth, db } from "../firebase";
import  { set,ref, onValue, remove, update,  } from "firebase/database";
import {  useNavigate } from "react-router-dom";

import SendIcon from '@mui/icons-material/Send';
import { Container, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Radio ,RadioGroup} from "@mui/material";
import Services from "./services";
export default function AddAnnouncement(){
    const navigate= useNavigate();
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
    const addAnnouncement = (e)=>{
        e.preventDefault();
        if(addingInput.title === ''){
            alert('Please Input Announcement title')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Service Description')
            return
        }
        const uidd= uid();
       var tempimage ='https://p.kindpng.com/picc/s/20-203415_megaphone-with-hand-png-public-service-announcement-icon.png';
            set(ref(db,"/announcements/"+uidd ), {
                  title: addingInput.title,
                serviceid: uidd,
                content: addingInput.content,
                imageUrl: tempimage,
                dateCreated: "26/05/2022"
            })
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
        <form noValidate autoComplete="off" onSubmit={addAnnouncement}>
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
             <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,workingHours:e.target.value})}
                variant="outlined"   
                label="Image"
                color="secondary"
                fullWidth
                required
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
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

 