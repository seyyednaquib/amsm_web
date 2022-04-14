import React,{ useEffect, useState } from "react";
import './homePage.css';

import { useNavigate } from "react-router-dom";
import {auth} from "../firebase.js";
import { signOut } from "firebase/auth";

import LogoutIcon from '@mui/icons-material/Logout';
export default function HomePage(){
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
    return(<div className="homepage">
        <h1>Management Melawis Apartment</h1>
        <button onClick={ () =>navigate('/createNewService')}>Create a New Service</button>
        <LogoutIcon className="logout-icon" onClick={handleSignOut}>Sign Out</LogoutIcon>
        </div>)
}