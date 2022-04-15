import React,{ useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {auth} from "../firebase.js";
import { signOut } from "firebase/auth";

import SendIcon from '@mui/icons-material/Send';
import { Container, makeStyles, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";


const useStyle = makeStyles({

})
export default function HomePage(){
    const classes =useStyle();
    const navigate = useNavigate();
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
       if(!user){
                navigate('/');
            }
        });
    },[]);

    const handleSignOut = ()=>{
        signOut(auth).then(()=> {navigate('/')}).catch((err)=> {alert(err.message);});
    }
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
        <form noValidate autoComplete="off">
            <TextField 
                className="field"
                variant="outlined"   
                label="Service Name"
                color="secondary"
                fullWidth
                required
            />
        </form>
        <Button 
            onClick={()=>console.log('a')}
            type='submit'
            color='primary'
            variant="contained"
            startIcon={<SendIcon/>}
        >
        Submit  
        </Button>
        </Container>)
        /* <h1>Management Melawis Apartment</h1>
        <Button className="service-button" variant="contained" onClick={ () =>navigate('/createNewService')}>Service </Button>
        <LogoutIcon className="logout-icon" onClick={handleSignOut}>Sign Out</LogoutIcon> */
       
}