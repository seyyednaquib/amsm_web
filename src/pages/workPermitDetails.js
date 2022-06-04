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
import { red } from "@mui/material/colors";
import { fontWeight } from "@mui/system";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from "jspdf";
import { uid } from "uid";
export default function WorkPermitDetails() {
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
  const handleAccept = (id) => {
    update(ref(db,"/applyWorkPermit/"+id ), {
        status: 'ACCEPTED'
    })
}

const generatePdf = (residentId) =>{
    const doc = new jsPDF();
    doc.text("Hello world!", 20, 10);
    document.querySelector('#content').style.display ="blok";
    doc.html(document.querySelector('#content'),{
        callback: function(pdf){
            pdf.save('myPdf.pdf');
        }
    })
    let file = doc.save(residentId+".pdf");
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
    <div>
    <strong> MALAWIS WORK PERMIT LETTER</strong>
  
    </div>

    )
}
