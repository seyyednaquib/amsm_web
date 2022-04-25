import React,{useState,useEffect} from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import  { ref, onValue, orderByChild, update } from "firebase/database";
import { Button, CardActionArea,  CardActions,  Container, Grid ,Paper} from "@mui/material";
import { remove } from 'firebase/database';
import { Card,  IconButton, Typography } from '@mui/material'
import { CardHeader } from '@mui/material'
import { CardContent } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
import { red } from "@mui/material/colors";

export default function BookedServicePage() {
  const navigate= useNavigate();
  const[complaints,setComplaints] =useState([]);
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/bookedService'),(snapshot) =>{
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
  
  const handleDelete = (id)=>{
    console.log(id);
      remove(ref(db, `/bookedService/${id}`));
  }

  const handleAccept = (id) => {
    update(ref(db,"/bookedService/"+id ), {
        status: 'ACCEPTED'
    })
  }
  return(<Container  >
      <Grid container spacing={3} sx={{mt:0.1}}>
      {complaints.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.bookingId} >
               <Card elevation={1} sx={{Maxheight:150 }}>
                <CardHeader
                    action={
                    <IconButton onClick={()=>handleDelete(note.bookingId)}>
                    <DeleteOutlined/>
                    </IconButton>
                    }
                    title={note.ServiceTitle}
                    subheader={note.dateCreated}
                />
                <CardContent >
                    
                    <Typography variant='body1' color="secondary">
                        Booking Date: {note.bookindDateAndTime}
                    </Typography>
                    <Typography variant='body1' color="textScondary">
                        User: {note.residentId}
                    </Typography>
                    <Typography variant='body2' color="textScondary">
                        Description: {note.description}
                    </Typography>
                </CardContent>
                
                <CardActions>
                 <Button variant={(note.status == '') ? 'outlined' : 'contained'} size="small" 
                 color={(note.status == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(note.status == '') ?  handleAccept(note.bookingId)  :  navigate('/bookedService/')}
                 > 
                 {(note.status == '') ? 'accept' : 'accepted'}
                  </Button>
                </CardActions>
            </Card>
          </Grid>   
      ))}
 
      </Grid>
  </Container>)
}
