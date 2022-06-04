import React,{useState,useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import  { ref, onValue, orderByChild } from "firebase/database";
import { Button, CardActionArea,  CardActions,  Container, Grid ,Paper} from "@mui/material";
import { remove } from 'firebase/database';
import { Card,  IconButton, Typography } from '@mui/material'
import { CardHeader } from '@mui/material'
import { CardContent } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Complaints() {
  const navigate= useNavigate();
  const[complaints,setComplaints] =useState([]);
  const[resident,setResident] =useState([]);
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/complaints'),(snapshot) =>{
                  setComplaints([]);
                  const data = snapshot.val();
                  Object.values(data).map(complaints =>{return (
                      setComplaints((oldArray)=> [...oldArray,complaints]))
                  })
              })
              onValue(ref(db, '/residents'),(snapshot) =>{
                setResident([]);
                const data = snapshot.val();
                Object.values(data).map(bookedService =>{return (
                  setResident((oldArray)=> [...oldArray,bookedService]))
                })
            })
              console.log(complaints);
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  
  const handleDelete = (uid)=>{
    console.log(uid);
    remove(ref(db, `complaints/${uid}`));
    console.log('Delete complaints/'+uid);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell  sx={{fontWeight: 'bold' }}>Complaint </TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">Date</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Resident Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Unit No</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">Description</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {complaints.sort((a, b) => a.dateCreated > b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.complaintId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.complaintTitle}
              </TableCell>
              <TableCell align="left">{row.dateCreated}</TableCell>
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rName}</TableCell>  : ''
              ))}
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rUnit}</TableCell>  : ''
              ))}
              <TableCell align="left">{row.complaintContent}</TableCell>
              <TableCell align="left">
                  <Button variant={(row.ComplaintRespond == '') ? 'outlined' : 'contained'} size="small" 
                 color={(row.ComplaintRespond == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(row.ComplaintRespond == '') ?  navigate('/complaintDetails/'+row.complaintId)  :  navigate('/complaints/')}
                 > 
                 {(row.ComplaintRespond == '') ? 'respond' : 'responded'}
                  </Button>
                  
              </TableCell>
              {row.ComplaintRespond == ''? null: <DeleteOutlineIcon sx={{marginTop:1.7}} color="warning" onClick={()=>handleDelete(row.complaintId)}/> }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
