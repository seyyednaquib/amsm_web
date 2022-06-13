import React,{ useEffect, useState } from "react";
import axios from 'axios'
import { uid } from "uid";
import { auth, db ,} from "../firebase";
import { getStorage ,ref as ref_storage,uploadBytes,getDownloadURL } from "@firebase/storage";
import  { set,ref , onValue, remove,  } from "firebase/database";
import Divider from '@mui/material/Divider';
import {  useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import { Container, FormControlLabel, FormLabel, Typography ,Paper,} from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UploadFileOutlined } from "@mui/icons-material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Radio ,RadioGroup} from "@mui/material";
export default function AddVisitor(){
    const navigate= useNavigate();
    const[announcement,setAnnouncement] =useState([]);
    const[resident,setResident] =useState([]);
    const [imageUpload,setImageUpload] = useState(null);
    const [imageUrl,setImageUrl] =useState('');
    const [isImportant,setIsImportant]=useState('false');
    const [addingInput,setaddingInput] =useState({
        name:'',
        icpassport:'',
        unit:'',
    });
    useEffect(()=>{
      auth.onAuthStateChanged(user => {
        if(user){
        }else if(!user){
            navigate('/');
        }
    });
    },[]);


    const addVisitor = (e)=>{
        e.preventDefault();
        if(addingInput.name === ''){
            alert('Please Input Vistior Name')
            return
        }else if(addingInput.icpassport === ''){
            alert('Please Input Visitor IC/PASSPORT')
            return
        }else if(addingInput.unit === ''){
            alert('Please Input Unit No')
            return
        }
        const uidd= uid();
       var tempimage ='https://www.kindpng.com/picc/m/20-203415_megaphone-with-hand-png-public-service-announcement-icon.png';
       var today = new Date();
       let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth() + 1 ;
month = (today.getMonth() + 1 <10) ? '0'+month :  month;
date = (today.getDate()  <10) ? '0'+date :  date;
let hours = today.getHours();
hours = (today.getHours()  <10) ? '0'+hours :  hours;
let minute = today.getMinutes();
minute =  (today.getMinutes()  <10) ? '0'+minute :  minute;
let year = newDate.getFullYear();
    var time = today.getFullYear() + '-' +  month + '-' + date+ ' ' +hours + ':' + minute ;
    //var time = year ;
        set(ref(db,"/visitors/"+uidd ), {
          visitorId: uidd,
        visitorName: addingInput.name,
        expectedEntryTime: time,
        EntryTime: time,
        visitorIcPassport: addingInput.icpassport,
        unit: addingInput.unit,
        visitorPreRegis: "false",
        visitorValidate: "true",
        dateCreated: time,
      })
      

        setaddingInput('');
        navigate('/security')
    };

    const handleDelete = (uid)=>{
      console.log(uid);
      remove(ref(db, `announcements/${uid}`));
      console.log('Delete announcements/'+uid);
    }
    return(
        <Container>
        <Typography 
            variant="h6"
            component="h2"
            color="textSecondary"
            gutterBottom
        >
            New Direct Coming Visitor
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addVisitor}>
            <TextField 
               onChange={(e)=> setaddingInput({...addingInput,name:e.target.value})}
                variant="outlined"   
                label="Full Name"
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
                 onChange={(e)=> setaddingInput({...addingInput,icpassport:e.target.value})}
                variant="outlined"   
                label="IC/PASSPORT"
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
                onChange={(e)=> setaddingInput({...addingInput,unit:e.target.value})}
                variant="outlined"   
                label="Unit"
                color="secondary"
                fullWidth
                required
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
            sx={{marginTop:2 , marginBottom:4}}
            >
            Submit  
            </Button>
            <Divider sx={{ borderBottomWidth: 5,marginBottom:2 }} />
        </form>
       
    <div style={{  height:30 }}>  </div>
        </Container>)
}

 