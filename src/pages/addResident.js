import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";
import { auth, db } from "../firebase";
import  { set,ref, onValue, remove, update,  } from "firebase/database";
import {  useNavigate } from "react-router-dom";

import SendIcon from '@mui/icons-material/Send';
import { Box, Container, FormControlLabel, FormLabel, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Radio ,RadioGroup} from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function AddResident() {
    const navigate= useNavigate();
    const [addingInput,setaddingInput] =useState({
        residentId:'',
        rName:'',
        rPhone:'',
        rUnit:'',
        rEmail:'',
    });
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(!user){
                navigate('/');
            }
        });
    },[]);
    const addResident = (e)=>{
        e.preventDefault();
        if(addingInput.rName === ''){
            alert('Please Input Resident Name')
            return
        }else if(addingInput.rEmail === ''){
            alert('Please Input Resident Email')
            return
        }else if(addingInput.rPhone === ''){
            alert('Please Input Resident Phone Number')
            return
        }
        const tempPassword= 'Melawis@123';
        createUserWithEmailAndPassword(auth,addingInput.rEmail+'@melawis.my',tempPassword).then(()=> { 
            console.log(auth.currentUser.uid);
           set(ref(db,"/residents/"+auth.currentUser.uid ), {
            residentId: auth.currentUser.uid,
            rName: addingInput.rName,
            rphone: addingInput.rPhone,
            rUnit: addingInput.rUnit,
            rEmail: addingInput.rEmail+'@melawis.my',
           }); 
           setaddingInput('');
           navigate('/services');
        }).catch((err=> alert(err.message)));
    };

  return (
    <Container sx={{display:'block'}}>
        <Typography 
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          New Resident
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addResident}> 
        <TextField 
          onChange={(e)=> setaddingInput({...addingInput,rName:e.target.value})}
          variant="outlined"   
          label="Full Name"
          color="secondary"
          fullWidth
          required
          sx={{
              marginTop:2,
              marginBottom:2,
          }}
        />
        <TextField 
          onChange={(e)=> setaddingInput({...addingInput,rPhone:e.target.value})}
          variant="outlined"   
          label="Phone Number"
          defaultValue='+60'
          color="secondary"
          fullWidth
          required
          sx={{
            marginBottom:2,
          }}
        />
        <TextField 
          onChange={(e)=> setaddingInput({...addingInput,rUnit:e.target.value})}
          variant="outlined"   
          label="Unit Number"
          defaultValue='M'
          color="secondary"
          fullWidth
          sx={{
            marginBottom:2,
          }}
        />
        <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
        <TextField 
          onChange={(e)=> setaddingInput({...addingInput,rEmail:e.target.value})}
          variant="outlined"   
          label="Email"
          color="secondary"
          fullWidth
          sx={{
            marginBottom:2,
          }}
        />
        </Grid>
        <Grid item xs={6} md={2}>
        <TextField 
          onChange={(e)=> setaddingInput({...addingInput,rEmail:e.target.value})}
          variant="outlined"   
          defaultValue='@melawis.my'
          disabled
          color="secondary"
          sx={{
            marginBottom:2,
          }}
        />
        </Grid>
        </Grid>
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
    </Container>
  )
}
