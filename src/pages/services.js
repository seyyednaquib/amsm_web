import React,{useState,useEffect} from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import  { ref, onValue,orderByChild } from "firebase/database";
import { Container, Grid ,Paper} from "@mui/material";
import { remove } from 'firebase/database';
import NodeCard from "../components/NodeCard";

export default function Services(){
    const navigate= useNavigate();
    const[services,setServices] =useState([]);
    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, '/services'),(snapshot) =>{
                    setServices([]);
                    const data = snapshot.val();
                    Object.values(data).map(service =>{return (
                        setServices((oldArray)=> [...oldArray,service]))
                    })
                })
                console.log(services['service']);
            }else if(!user){
                navigate('/');
            }
        });
    },[]);
    
    const handleDelete = (uid)=>{
        console.log(uid);
        //remove(ref(db, `/services/${uid}`));
    }
    return(<Container  >
        <Grid container spacing={3} sx={{mt:0.1}}>
        {services.map(note => (
            <Grid item xs={12} md={6} lg={4} key={note.serviceid}>
                <NodeCard node={note}  title={note.service}  content={note.content}  subheader={note.workingHours} handleDelete={handleDelete}></NodeCard>
            </Grid>   
        ))}
        </Grid>
    </Container>)
}