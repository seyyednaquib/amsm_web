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
export default function AddAnnouncement(){
    const navigate= useNavigate();
    const[announcement,setAnnouncement] =useState([]);
    const[resident,setResident] =useState([]);
    const [imageUpload,setImageUpload] = useState(null);
    const [imageUrl,setImageUrl] =useState('');
    const [isImportant,setIsImportant]=useState('false');
    const uploadImage = ()=>{
        if(imageUpload==null)return;
        const uidd= uid();
        const storage = getStorage();
        const imageRef= ref_storage(storage,'announcements/'+imageUpload.name+uidd);
        uploadBytes(imageRef,imageUpload).then(()=> {
           getDownloadURL(imageRef).then((url)=>{
            setImageUrl(url);
            alert(imageUrl);
            });
        })
        alert(imageUrl);
    }
    const [addingInput,setaddingInput] =useState({
        title:'',
        content:'',
        image:''
    });
    useEffect(()=>{
      auth.onAuthStateChanged(user => {
        if(user){
            onValue(ref(db, '/announcements') ,(snapshot) =>{
              setAnnouncement([]);
                const data = snapshot.val();
                Object.values(data).map(announcement =>{return (
                  setAnnouncement((oldArray)=> [...oldArray,announcement]))
                })
            })
            onValue(ref(db, '/residents'),(snapshot) =>{
              setResident([]);
              const data = snapshot.val();
              Object.values(data).map(bookedService =>{return (
                setResident((oldArray)=> [...oldArray,bookedService]))
              })
          })
            console.log(announcement);
        }else if(!user){
            navigate('/');
        }
    });
    },[]);


    const addAnnouncement = (e)=>{
        e.preventDefault();
        if(addingInput.title === ''){
            alert('Please Input Announcement title')
            return
        }else if(addingInput.content === ''){
            alert('Please Input Service Description')
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

       if(imageUpload!=null){
        const storage = getStorage();
        const imageRef= ref_storage(storage,'announcements/'+imageUpload.name+uidd);
        uploadBytes(imageRef,imageUpload).then(()=> {
           getDownloadURL(imageRef).then((url)=>{
            console.log(url);
            set(ref(db,"/announcements/"+uidd ), {
             title: addingInput.title,
           serviceid: uidd,
           content: addingInput.content,
           ImgUrl: url,
           important: isImportant,
           dateCreated: time
       })
            });
        }) 
       }else{
        set(ref(db,"/announcements/"+uidd ), {
            title: addingInput.title,
            serviceid: uidd,
          content: addingInput.content,
          ImgUrl: tempimage,
          important: isImportant,
          dateCreated: time
      })
       }
       var data = JSON.stringify({
        "to": "dVgLggccRE6pREQWAQfVfN:APA91bFkMmo7vtwKy0j8sQb7xTGKN1yVYI55FuzPNV5kCjtije8aNtZ2svL4Sp5Avo9AseZNSBfIAkJ2fwsJYta2A4pW6YmfvuZvgbp-OH0t67XGAouslJh5wiNBge1HNx6Zs-Pt5Aom",
        "notification": {
          "body": addingInput.content,
          "title": addingInput.title
        },
        "data": {
          "route": "announcement"
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

        setaddingInput('');
        navigate('/addService')
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
            New Announcement
        </Typography>
        <form noValidate autoComplete="off" onSubmit={addAnnouncement}>
            <TextField 
               onChange={(e)=> setaddingInput({...addingInput,title:e.target.value})}
                variant="outlined"   
                label="Announcement Title"
                color="secondary"
                fullWidth
                required
                sx={{
                    marginTop:2,
                    marginBottom:2,
                    display:'block'
                }}
            />
               {/* <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/> */}
               <Button variant="contained" component="label" endIcon={<UploadFileOutlined />}>
                Upload Picture <input type="file" hidden onChange={(event)=>{setImageUpload(event.target.files[0])} } />
              </Button>
              { imageUpload!==null ? <Typography variant="p" marginLeft={2}  >
              Uploaded
              </Typography> : null }
            
            <TextField 
                 onChange={(e)=> setaddingInput({...addingInput,content:e.target.value})}
                variant="outlined"   
                label="Announcement Content"
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
             <FormLabel>Shows after login</FormLabel>
            <RadioGroup value={isImportant} onChange={(e) => setIsImportant(e.target.value)}>
                <FormControlLabel control={<Radio color="secondary"/>} value="false" label="No" />
                <FormControlLabel control={<Radio color="secondary"/>} value="true" label="Yes" />
            </RadioGroup>
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
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
          <TableCell sx={{fontWeight: 'bold' ,minWidth: 120}}align="left">Posted</TableCell>
            <TableCell  sx={{fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{fontWeight: 'bold' }} align="left">Content</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcement.sort((a, b) => a.dateCreated > b.dateCreated ? -1 : 1).map((row) => (
            <TableRow
              key={row.applyId }
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.dateCreated} </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.content}</TableCell>
              <TableCell align="left"> <DeleteOutlineIcon sx={{marginTop:1.3}} color="warning" onClick={()=>handleDelete(row.serviceid)}/> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{  height:30 }}>  </div>
        </Container>)
}

 