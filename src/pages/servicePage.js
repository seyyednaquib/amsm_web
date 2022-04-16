import React, { useEffect, useState ,TouchableOpacity} from "react";
import './newService.css';

import { auth, db } from "../firebase";
import {  useNavigate ,Link} from "react-router-dom";
import { uid } from "uid";
import  {set, ref, onValue, remove, update,  } from "firebase/database";

//icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@mui/material";
//icons

export default function ServicePage(){

    const navigate= useNavigate();
    const[service,setService] =useState('');
    const[services,setServices] =useState([]);
    const [isAdding,setisAdding] = useState(false);
    const [addingInput,setaddingInput] =useState({
        name:'',
        content:'',
        workingHours:''
    });

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

    //add
    const addService = ()=>{
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
     
        setisAdding(false)
        setService('');
        setIsEdit(false);
        setaddingInput('');
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
        
    }
    
    return(
    <div className="content">
       
       
        {services.map(service => { return(
            
                <div className="service-preview " key={service.serviceid}>  
                 <Link to={{pathname:'/serviceDetails/'+service.serviceid}}>
                <h2 >{service.service}</h2>
                </Link>
                <EditIcon className="edit-button" onClick={()=>handleUpdate(service)}>Update</EditIcon>
                <DeleteIcon className="delete-button" onClick={()=>handleDelete(service.serviceid)}>Delete</DeleteIcon>
                </div>
                /* 
                 */
              
                
            )}) }
        {/* {isEdit ? (<CheckIcon  className="add-confirm-icon" onClick={confirmUpdate}>Confirm</CheckIcon>): (<AddIcon  className="add-confirm-icon" onClick={addService}>add</AddIcon >)}  */}
        <HomeIcon className="home-icon" onClick={ () =>navigate('/homepage')}>HOME</HomeIcon>
        <Button  
            color='primary'
            variant="contained" 
            onClick={ () =>navigate('/addService')}>
            ADD NEW SERVICE 
         </Button>
        <div className="register-service-container">
        {isAdding ? <>   
                <input type="text"  placeholder="Service Name" value={addingInput.name} onChange={(e)=> setaddingInput({...addingInput,name:e.target.value})}/>
                <input type="text"  placeholder="Service Description" value={addingInput.content} onChange={(e)=> setaddingInput({...addingInput,content:e.target.value})}/>
                <input type="text"  placeholder="Workdays" value={addingInput.workingHours} onChange={(e)=> setaddingInput({...addingInput,workingHours:e.target.value})}/>
                <button onClick={addService}>Register</button>
                <button onClick={()=>setisAdding(false)}>Go Back</button></>
                
                :
                
                <>   
                <button className="register-button" onClick={()=>setisAdding(true)}>Register New Service</button></>}
        </div>
    </div>)
}