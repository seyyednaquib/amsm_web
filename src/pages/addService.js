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
export default function AddService(){
    const {id}=useParams();
    const navigate= useNavigate();
    const[service,setServices] =useState('');
    const [addingInput,setaddingInput] =useState({
        name:'',
        content:'',
        workingHours:''
    });
    const [isWeekend,setIsWeekend]=useState('false');
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
        e.preventDefault();
        if(addingInput.name === ''){
            alert('Please Input Service Name')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Service Description')
            return
        }else if(addingInput.workingHours === ''){
            alert('Please Input Working Hours and Date')
            return
        }
        const uidd= uid();
       var tempWorkingHours;
            if(isWeekend=='true'){
               tempWorkingHours= 'MON-SUN ' + addingInput.workingHours;
            }else{
                tempWorkingHours= 'SUN-FRIDAY ' + addingInput.workingHours;
            }
            set(ref(db,"/services/"+uidd ), {
                service: addingInput.name,
                serviceid: uidd,
                content: addingInput.content,
                workingHours: tempWorkingHours
            })
        setaddingInput('');
        navigate('/services')
    };

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
                 onChange={(e)=> setaddingInput({...addingInput,workingHours:e.target.value})}
                variant="outlined"   
                label="Working Hours"
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
            <FormLabel>Working on weekend</FormLabel>
            <RadioGroup value={isWeekend} onChange={(e) => setIsWeekend(e.target.value)}>
                <FormControlLabel control={<Radio color="secondary"/>} value="false" label="No" />
                <FormControlLabel control={<Radio color="secondary"/>} value="true" label="Yes" />
            </RadioGroup>
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
        <Services sx={{marginTop:30 ,marginBottom:30}}/>
       
        </Container>)
}

 