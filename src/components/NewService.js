import React, { useEffect, useState } from "react";
import './newService.css';

import { auth, db } from "../firebase";
import {  useNavigate } from "react-router-dom";
import { uid } from "uid";
import  {set, ref, onValue, remove, update,  } from "firebase/database";

//icons
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';
//icons

export default function CreateNewService(){

    const navigate= useNavigate();
    const[service,setService] =useState('');
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
            }else if(!user){
                navigate('/');
            }
        });
    },[]);

    //add
    const addService = ()=>{
        const uidd= uid();
        if(service!== ''){
            set(ref(db,"/services/"+uidd ), {
                service: service,
                serviceid: uidd,
            })
        }else{
            alert("gabole");
        }
  
        setService('');
    };

    //delete
    const handleDelete = (uid)=>{
        remove(ref(db, `/services/${uid}`));
    }
    //update
    const [isEdit,setIsEdit] = useState(false);
    const[tempUid,setTempUid] =useState('');
    const handleUpdate = (service)=>{
        setIsEdit(true);
        setService(service.service);
        setTempUid(service.serviceid);
    }
    const confirmUpdate = ()=>{
         update(ref(db,'services/'+tempUid),{
            service: service,
            serviceid: tempUid,
        });
        setService('');
        setIsEdit(false);
    }
    
    return(<div className="newServicePage">
        <h1>Add Services</h1>
        <input className="add-edit-input" type='text' placeholder="Service Name" value={service} onChange={(e) => setService(e.target.value)}></input>
        {services.map(service => { return(
                <div className="service"> <h1 key={service.serviceid}>{service.service}</h1>
                <EditIcon className="edit-button" onClick={()=>handleUpdate(service)}>Update</EditIcon>
                <DeleteIcon className="delete-button" onClick={()=>handleDelete(service.serviceid)}>Delete</DeleteIcon>
                </div>
            )}) }
        {isEdit ? (<CheckIcon  className="add-confirm-icon" onClick={confirmUpdate}>Confirm</CheckIcon>): (<AddIcon  className="add-confirm-icon" onClick={addService}>add</AddIcon >)} 
        <HomeIcon className="home-icon" onClick={ () =>navigate('/homepage')}>HOME</HomeIcon>
    </div>)
}