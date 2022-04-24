import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";
import { auth, db } from "../firebase";
import  { set,ref, onValue, remove, update,  } from "firebase/database";
import {  useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import SendIcon from '@mui/icons-material/Send';
import { Box, Container, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
export default function ComplaintDetails(){
    const {id}=useParams();
    const navigate= useNavigate();
    const[complaint,setComplaints] =useState('');
    const [addingInput,setaddingInput] =useState({ComplaintRespond:''});
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, '/complaints/'+id),(snapshot) =>{
                    if (snapshot.exists()) {
                        const data= snapshot.val();
                        setComplaints(data);
                        console.log(data)
                      } else {
                        console.log("No data available");
                      }
                })
             
            }else if(!user){
                navigate('/');
            }
        });
    },[]);
    const updateRespond = (e)=>{
        e.preventDefault()
        if(addingInput.name === ''){
            alert('Please Input Respond')
            return
        }
            update(ref(db,"/complaints/"+id ), {
                ComplaintRespond: addingInput.ComplaintRespond,
            })
        setaddingInput('');
        navigate('/complaints');
    };
   
    return(
        <Container>
        <Typography 
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
        >
            Respond to Complaint 
        </Typography>
            <Typography variant="caption" sx={{marginLeft:1.5 ,color:'#646464'} } >
                Title
            </Typography>
            <Box sx={{ 
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'primary.darkgrey',
                    padding:1.5,
                    display:'block'}}
            >
                <Typography variant="body2" >
                {complaint.complaintTitle}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{marginLeft:1.5 ,color:'#646464'} } >
                Resident ID 
            </Typography>
            <Box sx={{ 
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'primary.darkgrey',
                    padding:1.5,
                    display:'block'}}
            >
                <Typography variant="body2" >
                {complaint.residentId}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{marginLeft:1.5 ,color:'#646464'} } >
                Complaint Date
            </Typography>
            <Box sx={{ 
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'primary.darkgrey',
                    padding:1.5,
                    display:'block'}}
            >
                <Typography variant="body2" >
                {complaint.dateCreated}
                </Typography>
            </Box>
            <Typography variant="caption" sx={{marginLeft:1.5 ,color:'#646464'} } >
                Content
            </Typography>
            <Box sx={{ 
                    border: 1,
                    borderRadius: 1,
                    borderColor: 'primary.darkgrey',
                    padding:1.5,
                    display:'block',
                    height:100
                    }}
            >
                <Typography variant="body2" >
                {complaint.complaintContent}
                </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={updateRespond}>
            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,ComplaintRespond:e.target.value})}
                variant="outlined"   
                label="Respond"
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
            >
            Submit  
            </Button>
        </form>
  
        </Container>)
}

 