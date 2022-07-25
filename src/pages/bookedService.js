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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Complaint2() {
  const navigate= useNavigate();
  const[bookedService,setBookedService] =useState([]);
  const[resident,setResident] =useState([]);
  var username ;
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/bookedService'),(snapshot) =>{
                  setBookedService([]);
                  const data = snapshot.val();
                  Object.values(data).map(bookedService =>{return (
                      setBookedService((oldArray)=> [...oldArray,bookedService]))
                  })
              })
              onValue(ref(db, '/residents'),(snapshot) =>{
                setResident([]);
                const data = snapshot.val();
                Object.values(data).map(bookedService =>{return (
                  setResident((oldArray)=> [...oldArray,bookedService]))
                })
            })
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  
  const handleDelete = (id)=>{
    console.log(id);
      remove(ref(db, `/bookedService/${id}`));
  }

    const getUsername =(residentId) =>{
    const dbRef = ref(getDatabase());
        get(child(dbRef, `residents/${residentId}/rName`)).then((snapshot) => {
          console.log(snapshot.val());
      })

};


  const handleAccept = (id) => {
    update(ref(db,"/bookedService/"+id ), {
        status: 'ACCEPTED'
    })
    var data = JSON.stringify({
      "to": "c6-rpcGETFOasHl596QH3x:APA91bFAEMaVaiPtIUMx6Xoh2xFXTZrzB48ZbynQ3xm6_-OfauYh_78egtWaPA1HxQLpIjdnIht5t85xS0pzt9iU4UjvxIRjtrX2v6948T3jzC0RKcnomjFIST4jGLDRNzl6DLaF2MBg",
      "notification": {
        "body": "Booking Status",
        "title": "Booking Status Accepted"
      },
      "data": {
        "route": "myservice"
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
            <TableCell sx={{fontWeight: 'bold' }}>Booked Service </TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">DateTime</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Resident Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Unit No</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Description</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}  align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedService.map((row) => (
            <TableRow
              key={row.bookingId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.ServiceTitle}</TableCell>
              <TableCell align="left">{row.bookindDateAndTime}</TableCell>
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rName}</TableCell>  : ''
              ))}
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rUnit}</TableCell>  : ''
              ))}
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">
              <Button variant={(row.status == '') ? 'outlined' : 'contained'} size="small" 
                 color={(row.status == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(row.status == '') ?  handleAccept(row.bookingId)  :  navigate('/bookedService/')}
                 > 
                 {(row.status == '') ? 'accept' : 'accepted'}
                  </Button>
              </TableCell>
              <DeleteOutlineIcon sx={{marginTop:1.3}} color="warning" onClick={()=>handleDelete(row.bookingId)}/> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
