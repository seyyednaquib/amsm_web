import React,{ useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import  { ref, onValue, remove, update,  } from "firebase/database";
import {  useNavigate } from "react-router-dom";
export default function ServiceDetails(){
    const {id}=useParams();
    const navigate= useNavigate();
    const[service,setServices] =useState('');
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
    return(<div className="welcome">
                <div  key={service.serviceid}>  
                <h2 >Service Details - {service.service}</h2>
                <h2 >Date- {service.content}</h2>
                <h2 >Date- {service.workingHours}</h2> 

          </div>
        </div>)
}

 