import React,{useState,useEffect} from "react";
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

export default function Complaint() {
  const navigate= useNavigate();
  const[complaints,setComplaints] =useState([]);
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
              console.log(complaints);
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  
  const handleDelete = (uid)=>{
    console.log(uid);
     // remove(ref(db, `/complaints/${uid}`));
  }
  return(<Container  >
      <Grid container spacing={3} sx={{mt:0.1}}>
      {complaints.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.complaintId} >
               <Card elevation={1} sx={{Maxheight:150 }}>
                <CardHeader
                    action={
                    <IconButton onClick={()=>handleDelete(note.complaintId)}>
                    <DeleteOutlined/>
                    </IconButton>
                    }
                    title={note.complaintTitle}
                    subheader={note.dateCreated}
                />
                <CardContent >
                    <Typography variant='body2' color="textScondary">
                        {note.complaintContent}
                    </Typography>
                </CardContent>
                <CardActions>
                 <Button variant={(note.ComplaintRespond == '') ? 'outlined' : 'contained'} size="small" 
                 color={(note.ComplaintRespond == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(note.ComplaintRespond == '') ?  navigate('/complaintDetails/'+note.complaintId)  :  navigate('/complaints/')}
                 > 
                 {(note.ComplaintRespond == '') ? 'respond' : 'responded'}
                  </Button>
                </CardActions>
            </Card>
          </Grid>   
      ))}
 
      </Grid>
  </Container>)
}
