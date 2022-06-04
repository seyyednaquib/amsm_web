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
import { remove,update } from 'firebase/database';
import { Card,  IconButton, Typography } from '@mui/material'
import { getStorage ,ref as ref_storage,uploadBytes,getDownloadURL } from "@firebase/storage";
import { DeleteOutlined, ImportContactsOutlined } from '@mui/icons-material'
import axios from 'axios'
import { fontWeight } from "@mui/system";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from "jspdf";
import { uid } from "uid";
export default function WorkPermit() {
  const navigate= useNavigate();
  const[workPermit,setWorkPermit] =useState([]);
  const[resident,setResident] =useState([]);
  useEffect(()=>{
      auth.onAuthStateChanged(user => {
          if(user){
              onValue(ref(db, '/applyWorkPermit'),(snapshot) =>{
                  setWorkPermit([]);
                  const data = snapshot.val();
                  Object.values(data).map(workPermit =>{return (
                    setWorkPermit((oldArray)=> [...oldArray,workPermit]))
                  })
              })
              onValue(ref(db, '/residents'),(snapshot) =>{
                setResident([]);
                const data = snapshot.val();
                Object.values(data).map(bookedService =>{return (
                  setResident((oldArray)=> [...oldArray,bookedService]))
                })
            })
              console.log(workPermit);
          }else if(!user){
              navigate('/');
          }
      });
  },[]);
  const handleAccept = (id,company) => {
    update(ref(db,"/applyWorkPermit/"+id ), {
        status: 'ACCEPTED'
    })
    var data = JSON.stringify({
        "to": "dVgLggccRE6pREQWAQfVfN:APA91bFkMmo7vtwKy0j8sQb7xTGKN1yVYI55FuzPNV5kCjtije8aNtZ2svL4Sp5Avo9AseZNSBfIAkJ2fwsJYta2A4pW6YmfvuZvgbp-OH0t67XGAouslJh5wiNBge1HNx6Zs-Pt5Aom",
        "notification": {
          "body": company,
          "title": 'Work Permit Status Updated'
        },
        "data": {
          "route": "MyWorkPermit"
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

const generatePdf = (residentId) =>{
    const doc = new jsPDF();
    doc.text("Hello world!", 20, 10);
    doc.html(document.querySelector('#content'),{
        callback: function(pdf){
           // pdf.save('myPdf.pdf');
           doc.output('dataurlnewwindow');
        }
    })
    //let file = doc.save(residentId+".pdf");
        // if(file !=null ) console.log('ada');
        //  const uidd= uid();
        //  const storage = getStorage();
        //   const fileRef= ref_storage(storage,'WorkPermit/'+file.name+uidd);
        //  uploadBytes(fileRef,file).then(()=> {
        //     getDownloadURL(fileRef).then((url)=>{
        //      alert(fileRef);
        //      });
        //  })
        // alert(imageUrl);
    
}
  const handleDelete = (uid)=>{
    console.log(uid);
    remove(ref(db, `applyWorkPermit/${uid}`));
    console.log('Delete applyWorkPermit/'+uid);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell  sx={{fontWeight: 'bold' }}>Unit No </TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">Start</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">End</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Resident Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">Company Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">PIC Name</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">PIC NRIC</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">PIC Phone No</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">No of Contractors</TableCell>
            <TableCell sx={{fontWeight: 'bold' }}align="left">Date Created</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workPermit.sort((a, b) => a.dateCreated > b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.applyId              }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell component="th" scope="row">
                {r.rUnit}
                </TableCell>  : ''
              ))}
              <TableCell align="left">{row.commencementDate}</TableCell>
              <TableCell align="left">{row.completionDate}</TableCell>
              {resident.map((r) => (
                (row.residentId==r.residentId) ?  <TableCell align="left">{r.rName}</TableCell>  : ''
              ))}
                 <TableCell align="left">{row.companyName}</TableCell>
                 <TableCell align="left">{row.picName}</TableCell>
                 <TableCell align="left">{row.picNRIC}</TableCell>
                 <TableCell align="left">{row.picphoneNo}</TableCell>
                 <TableCell align="left">{row.numberOfcontractors}</TableCell>
                 <TableCell align="left">{row.dateCrated}</TableCell>

              <TableCell align="left">
                  <Button variant={(row.status == '') ? 'outlined' : 'contained'} size="small" 
                 color={(row.status == '') ? 'secondary' : 'warning'} 
                 onClick={()=>(row.status == '') ?  handleAccept(row.applyId,row.companyName)  :  navigate('/workpermit/')}
                 > 
                 {(row.status == '') ? 'accept' : 'accepted'}
                  </Button>
              </TableCell>
              {row.status == ''? null: <PictureAsPdfIcon sx={{marginTop:1.7}} color="secondary" /> }
              <DeleteOutlineIcon sx={{marginTop:1.3}} color="warning" onClick={()=>handleDelete(row.applyId)}/> 
              {/* <ImportContactsOutlined onClick={()=>generatePdf(row.residentId)}/> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
