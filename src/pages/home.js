import React, { useState } from "react";
import './home.css';
import Widget from '../components/widget/Widget'
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase";
import  { ref, onValue, orderByChild } from "firebase/database";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Home = () => {
  const analytics = getAnalytics();
logEvent(analytics, 'notification_received');

const navigate= useNavigate();
const[resident,setResident] =useState([]);
useEffect(()=>{
    auth.onAuthStateChanged(user => {
        if(user){
            onValue(ref(db, '/residents'),(snapshot) =>{
              setResident([]);
              const data = snapshot.val();
              Object.values(data).map(bookedService =>{return (
                setResident((oldArray)=> [...oldArray,bookedService]))
              })
          })
            console.log(resident);
        }else if(!user){
            navigate('/');
        }
    });
},[]);

  return (<div><div className='widgets'>
  <Widget type='users' />

</div>

<TableContainer component={Paper} sx={{ mx: 3}}>
      <Table  size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
          <TableCell sx={{fontWeight: 'bold' }}align="left">Name</TableCell>
            <TableCell  sx={{fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Unit</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resident.sort((a, b) => a.dateCreated > b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.residentId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.rName} </TableCell>
              <TableCell align="left">{row.rEmail}</TableCell>
              <TableCell align="left">{row.rUnit}</TableCell>
              <TableCell align="left">{row.rphone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{  height:30 }}>  </div>
</div>)
     
}
 
export default Home;