import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";
import { auth, db } from "../firebase";
import  { set,ref, onValue, remove, update,  } from "firebase/database";
import {  useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import SendIcon from '@mui/icons-material/Send';
import { Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
export default function ServiceDetails(){
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, '/services/'+id),(snapshot) =>{
                    if (snapshot.exists()) {
                        const data= snapshot.val();
                        setServices(data);
                      } else {
                        console.log("No data available");
                      }
                })
             
            }else if(!user){
                navigate('/');
            }
        });
    },[]);
    const addService = (e)=>{
        e.preventDefault()
        if(addingInput.name === ''){
            alert('Please Input Service Name')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Service Description')
            return
        }else if(addingInput.workingHours === ''){
            alert('Please Input Service Name')
            return
        }
        const uidd= uid();
            set(ref(db,"/services/"+uidd ), {
                service: addingInput.name,
                serviceid: uidd,
                content: addingInput.content,
                workingHours: addingInput.workingHours
            })
        setaddingInput('');
    };
    const {id}=useParams();
    const navigate= useNavigate();
    const[service,setServices] =useState('');
    const [addingInput,setaddingInput] =useState({
        name:'',
        content:'',
        workingHours:''
    });
    return(
        <Container>
        <Typography 
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
        >
            New Services
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addService}>
            <TextField 
               onChange={(e)=> setaddingInput({...addingInput,name:e.target.value})}
                variant="outlined"   
                label="Service Name"
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
                label="Description"
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
            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,workingHours:e.target.value})}
                variant="outlined"   
                label="Description"
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
        </form>
        <Button 
            type='submit'
            color='primary'
            variant="contained"
            startIcon={<SendIcon/>}
        >
        Submit  
        </Button>
        </Container>)
}

 