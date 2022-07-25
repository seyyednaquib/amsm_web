import React,{useState,useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import  { ref, onValue, orderByChild, getDatabase, get ,child} from "firebase/database";
import { Button, CardActionArea,  CardActions,  Container, Grid ,Paper} from "@mui/material";
import { remove ,update} from 'firebase/database';
import { Card,  IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { async } from "@firebase/util";


export default function ValidateVisitor() {
  const navigate= useNavigate();
  const[visitors,setvisitors] =useState([]);
  const[resident,setResident] =useState([]);
  var username ;
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/visitors'),(snapshot) =>{
                  setvisitors([]);
                  const data = snapshot.val();
                  Object.values(data).map(visitors =>{return (
                      setvisitors((oldArray)=> [...oldArray,visitors]))
                  })
              })
              onValue(ref(db, '/residents'),(snapshot) =>{
                setResident([]);
                const data = snapshot.val();
                Object.values(data).map(visitors =>{return (
                  setResident((oldArray)=> [...oldArray,visitors]))
                })
            })
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  
  const handleDelete = (id)=>{
    console.log(id);
      remove(ref(db, `/visitors/${id}`));
  }

    const getUsername =(residentId) =>{
    const dbRef = ref(getDatabase());
        get(child(dbRef, `residents/${residentId}/rName`)).then((snapshot) => {
          console.log(snapshot.val());
      })

};


  const handleAccept = (id,name) => {
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
 var time = today.getFullYear() + '-' +  month + '-' + date+ ' ' +hours + ':' + minute ;
    var time = today.getFullYear() + '-' +  month + '-' + date+ ' ' +hours + ':' + minute ;
    update(ref(db,"/visitors/"+id ), {
        visitorValidate : 'true',
        EntryTime : time

    })
    var data = JSON.stringify({
      "to": "c6-rpcGETFOasHl596QH3x:APA91bFAEMaVaiPtIUMx6Xoh2xFXTZrzB48ZbynQ3xm6_-OfauYh_78egtWaPA1HxQLpIjdnIht5t85xS0pzt9iU4UjvxIRjtrX2v6948T3jzC0RKcnomjFIST4jGLDRNzl6DLaF2MBg",
      "notification": {
        "body": name,
        "title": "Visitor Validated"
      },
      "data": {
        "route": "x"
      }
    });
   
   var config = {
     method: 'post',
     url: 'https://fcm.googleapis.com/fcm/send',
     headers: { 
       'Content-Type': 'application/json', 
       'Authorization': 'key=AAAAXsbdkuk:APA91bHW3tgIsNoFWwCZYgDLEpLJ8gxLf_t5GgjdEln9w5e_LqkxDP0OWVQT_a0wIMH12Uili0OKsCmmhMrQKIuUXY5zPW1Y9u-pEQehwEkqIsuM3yP15hanE-BorWvCTfJfp8Nasu-H'
     },
     data : data
   };
   
   axios(config)
   .then(function (response) {
     console.log(JSON.stringify(response.data));
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight: 'bold' }}>Date Created</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Visitor Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Visitor IC/Passport</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Resident Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Unit No</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Expected Entry Time</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Entry Time</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}  align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visitors.sort((a, b) => a.dateCreated < b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.bookingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.dateCreated}</TableCell>
              <TableCell align="left">{row.visitorName}</TableCell>
              <TableCell align="left">{row.visitorIcPassport}</TableCell>
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rName}</TableCell>  : ''
              ))}
              {(row.visitorPreRegis=="false") ?  <TableCell align="left">-</TableCell>  : ''}
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rUnit}</TableCell>  : ''
              ))}
                {(row.visitorPreRegis=="false") ?  <TableCell align="left">{row.unit}</TableCell>  : ''}
              <TableCell align="left">{row.expectedEntryTime}</TableCell>
              <TableCell align="left">{row.EntryTime}</TableCell>
              <TableCell align="left">
              <Button variant={(row.visitorValidate == '') ? 'outlined' : 'contained'} size="small" 
                 color={(row.visitorValidate == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(row.visitorValidate == '') ?  handleAccept(row.visitorId,row.visitorName)  :  navigate('/security')}
                 > 
                 {(row.visitorValidate == '') ? 'VALIDATE' : 'VALIDATED'}
                  </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
